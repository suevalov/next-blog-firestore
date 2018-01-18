import React from "react";
import styled from "styled-components";
import { inject, observer } from "mobx-react";
import { Form, Select, Row, Col } from "antd";
import { PostStatus, PostsOrder } from "~/stores/postsStore";

const FiltersContainer = styled.div`
  .ant-form {
    padding: 20px 0;
    border-top: 1px solid #e5eff5;
  }

  .ant-form-item {
    display: flex !important;
    margin-right: 0 !important;
    padding-right: 16px;

    .ant-form-item-control-wrapper {
      flex-grow: 1;
    }

    .ant-form-item-control {
      width: 100%;
    }
  }
`;

@inject("blog")
@observer
class AdminPostsFilters extends React.Component {
  onChange = field => value => {
    this.props.blog.posts.changeFilters({
      [field]: value
    });
  };

  render() {
    const {
      sortBy,
      status,
      author,
      language,
      category
    } = this.props.blog.posts;

    const authors = this.props.blog.authors.allAuthors;
    const languages = this.props.blog.ui.allLanguages;
    const categories = this.props.blog.categories.allCategories;

    return (
      <FiltersContainer>
        <Form layout="inline">
          <Row>
            <Col md={4}>
              <Form.Item>
                <Select onChange={this.onChange("status")} value={status}>
                  <Select.Option value="all">All posts</Select.Option>
                  <Select.Option value={PostStatus.Published}>
                    Published
                  </Select.Option>
                  <Select.Option value={PostStatus.Draft}>Draft</Select.Option>
                  <Select.Option value={PostStatus.PendingCorrections}>
                    Pending Corrections
                  </Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col md={4}>
              <Form.Item>
                <Select onChange={this.onChange("author")} value={author}>
                  <Select.Option value="all">All authors</Select.Option>
                  {authors.map(author => (
                    <Select.Option value={author.id} key={author.id}>
                      {author.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col md={4}>
              <Form.Item>
                <Select onChange={this.onChange("language")} value={language}>
                  <Select.Option value="all">All languages</Select.Option>
                  {languages.map(language => (
                    <Select.Option value={language.id} key={language.id}>
                      {language.title}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col md={4}>
              <Form.Item>
                <Select onChange={this.onChange("category")} value={category}>
                  <Select.Option value="all">All categories</Select.Option>
                  {categories.map(category => (
                    <Select.Option value={category.id} key={category.id}>
                      {category.title}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col md={{ offset: 2, span: 6 }} style={{ textAlign: "right" }}>
              <Form.Item label="Sort by" style={{ paddingRight: 0 }}>
                <Select onChange={this.onChange("sortBy")} value={sortBy}>
                  <Select.Option value={PostsOrder.Newest}>
                    Newest
                  </Select.Option>
                  <Select.Option value={PostsOrder.Oldest}>
                    Oldest
                  </Select.Option>
                  <Select.Option value={PostsOrder.ByPublication}>
                    By Publication
                  </Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </FiltersContainer>
    );
  }
}

export default AdminPostsFilters;
