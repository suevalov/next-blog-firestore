import "isomorphic-unfetch";
import Config from "~/utils/config";

const projectId = process.env.F_PROJECT_ID;
const apiBase = `https://firestore.googleapis.com/v1beta1/projects/${projectId}/databases/(default)`;

function convertPostContentResponseToPost(json, name = "published") {
  if (!json || !json.document) {
    return null;
  }
  const fields = json.document.fields[name].mapValue.fields;
  const metaFields = fields.meta.mapValue.fields;
  return {
    title: fields.title ? fields.title.stringValue : "",
    text: fields.text ? fields.text.stringValue : "",
    author: metaFields.author ? metaFields.author.stringValue : "",
    date: metaFields.date ? metaFields.date.stringValue : "",
    featured: metaFields.featured ? metaFields.featured.booleanValue : false,
    hasTranslation: metaFields.hasTranslation
      ? metaFields.hasTranslation.booleanValue
      : false,
    category: metaFields.category ? metaFields.category.stringValue : "",
    language: metaFields.language ? metaFields.language.stringValue : "",
    ogImage: metaFields.ogImage ? metaFields.ogImage.stringValue : "",
    tags:
      metaFields.tags &&
      metaFields.tags.arrayValue &&
      metaFields.tags.arrayValue.values
        ? metaFields.tags.arrayValue.values.map(value => value.stringValue)
        : [],
    thumbImage: metaFields.thumbImage ? metaFields.thumbImage.stringValue : "",
    thumbText: metaFields.thumbText ? metaFields.thumbText.stringValue : "",
    fullscreenVideo: metaFields.fullscreenVideo
      ? metaFields.fullscreenVideo.stringValue
      : "",
    url: metaFields.url ? metaFields.url.stringValue : ""
  };
}

export async function fetchPublishedPost(url) {
  const res = await fetch(
    `${apiBase}/documents:runQuery?fields=document%2Ffields`,
    {
      method: "POST",
      body: JSON.stringify({
        structuredQuery: {
          select: {
            fields: [{ fieldPath: "published" }]
          },
          from: [{ collectionId: "posts" }],
          where: {
            fieldFilter: {
              field: { fieldPath: "published.meta.url" },
              op: "EQUAL",
              value: { stringValue: url }
            }
          }
        }
      })
    }
  );
  const json = await res.json();
  return convertPostContentResponseToPost(json[0]);
}

export async function fetchDraftPost(id) {
  const res = await fetch(`${apiBase}/documents/posts/${id}`);
  const json = await res.json();
  console.log(json);
  return convertPostContentResponseToPost(
    {
      document: json
    },
    "draft"
  );
}

export async function fetchAllPublishedPosts(
  lang = Config.defaultLanguage,
  limit = null,
  offset = null
) {
  const res = await fetch(
    `${apiBase}/documents:runQuery?fields=document%2Ffields`,
    {
      method: "POST",
      body: JSON.stringify({
        structuredQuery: {
          select: {
            fields: [
              { fieldPath: "published.title" },
              { fieldPath: "published.meta" }
            ]
          },
          from: [{ collectionId: "posts" }],
          where: {
            fieldFilter: {
              field: {
                fieldPath: "published.meta.language"
              },
              op: "EQUAL",
              value: {
                stringValue: lang
              }
            }
          },
          limit: limit || undefined,
          offset: offset || undefined,
          orderBy: [
            {
              field: { fieldPath: "published.meta.date" },
              direction: "DESCENDING"
            }
          ]
        }
      })
    }
  );
  const json = await res.json();
  return json
    .map(item => convertPostContentResponseToPost(item))
    .filter(_ => _);
}
