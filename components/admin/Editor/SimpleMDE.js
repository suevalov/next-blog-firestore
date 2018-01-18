import React from "react";
import SimpleMDEEditor from "react-simplemde-editor";

function _replaceSelection(cm, active, startEnd) {
  if (/editor-preview-active/.test(cm.getWrapperElement().lastChild.className))
    return;
  var text;
  var start = startEnd[0];
  var end = startEnd[1];
  var startPoint = cm.getCursor("start");
  var endPoint = cm.getCursor("end");
  text = cm.getSelection();
  cm.replaceSelection(start + text + end);
  startPoint.ch += start.length;
  if (startPoint !== endPoint) {
    endPoint.ch += start.length;
  }
  cm.setSelection(startPoint, endPoint);
  cm.focus();
}

class SimpleMDE extends React.Component {
  getDefaultOptions() {
    return {
      spellChecker: false,
      autofocus: true,
      autosave: {
        enabled: false
      },
      toolbar: [
        "bold",
        "italic",
        "heading",
        "strikethrough",
        "|",
        "link",
        "horizontal-rule",
        "unordered-list",
        "ordered-list",
        "|",
        {
          name: "blockquote",
          action: function addBlockQuote(editor) {
            var cm = editor.codemirror;
            _replaceSelection(cm, true, [
              ["```marksy", '<Blockquote who="Albert Einstein">'].join("\n"),
              ["\n", "</Blockquote>", "```"].join("\n")
            ]);
          },
          className: "fa fa-quote-right",
          title: "Blockquote"
        },
        {
          name: "custom-image",
          action: function addImage(editor) {
            var cm = editor.codemirror;
            _replaceSelection(cm, true, [
              [
                "```marksy",
                "<Image",
                '  position="fullscreen|left|right"',
                '  previewSrc="<url-to-preview-image>"',
                '  src="<url-to-image>"',
                '  zoomSrc="<url-to-big-image>"',
                "  width={700}",
                "  height={500}",
                "  lazy={false|true}"
              ].join("\n"),
              ["\n/>", "```"].join("\n")
            ]);
          },
          className: "fa fa-picture-o",
          title: "Image"
        },
        {
          name: "custom-images-grid",
          action: function addImages(editor) {
            var cm = editor.codemirror;
            _replaceSelection(cm, true, [
              [
                "```marksy",
                "<ImageGrid>",
                "  <Image",
                '    previewSrc="<url-to-preview-image>"',
                '    src="<url-to-image>"',
                '    zoomSrc="<url-to-big-image>"',
                "    width={700}",
                "    height={500}",
                "  />"
              ].join("\n"),
              ["\n</ImageGrid>", "```"].join("\n")
            ]);
          },
          className: "fa fa-th-large",
          title: "Images Grid"
        },
        "|",
        {
          name: "youtube",
          action: function addYoutubePlayer(editor) {
            var cm = editor.codemirror;
            _replaceSelection(cm, true, [
              '\n\n```marksy\n<Player url="https://www.youtube.com/watch?v=<video-id>" controls />\n',
              "```\n"
            ]);
          },
          className: "fa fa-youtube-square",
          title: "Youtube Player"
        },
        {
          name: "vimeo",
          action: function addVimeoPlayer(editor) {
            var cm = editor.codemirror;
            _replaceSelection(cm, true, [
              '\n\n```marksy\n<Player url="https://vimeo.com/<video-id>" controls />\n',
              "```\n"
            ]);
          },
          className: "fa fa-vimeo-square",
          title: "Vimeo Player"
        },
        "|",
        {
          name: "custom_preview",
          action: this.props.onOpenPreview,
          className: "fa fa-eye",
          title: "Open Preview"
        },
        "guide"
      ],
      shortcuts: {
        toggleFullScreen: null,
        togglePreview: null,
        toggleSideBySide: null,
        drawImage: null
      },
      status: ["words"]
    };
  }

  render() {
    const { value, onChange, extraKeys, ...options } = this.props;

    return (
      <SimpleMDEEditor
        value={value}
        onChange={onChange}
        options={{
          ...this.getDefaultOptions(),
          ...options
        }}
        extraKeys={extraKeys}
      />
    );
  }
}

export default SimpleMDE;
