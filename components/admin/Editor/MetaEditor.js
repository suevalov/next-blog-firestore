import React from "react";
import styled from "styled-components";
import moment from "moment";
import { inject, observer } from "mobx-react";
import {
  Form,
  Input,
  Row,
  Col,
  Select,
  DatePicker,
  Collapse,
  Switch,
  Icon
} from "antd";

const StyledForm = styled(Form)`
  user-select: none;
`;

@inject("blog")
@observer
class MetaEditor extends React.Component {
  onFormSubmit = event => {
    event.preventDefault();
  };

  render() {
    const { initialValues } = this.props;
    const { getFieldDecorator } = this.props.form;
    const authors = this.props.blog.authors.allAuthors;
    const languages = this.props.blog.ui.allLanguages;
    const categories = this.props.blog.categories.allCategories;

    return (
      <StyledForm layout="vertical" onSubmit={this.onFormSubmit}>
        <Collapse accordion bordered={false} defaultActiveKey={["main"]}>
          <Collapse.Panel header="Main Settings" key="main">
            <Row>
              <Col xs={24}>
                <Form.Item label="Url">
                  {getFieldDecorator("url", {
                    initialValue: initialValues.url || "",
                    rules: [{ required: true, message: "Url is required" }]
                  })(<Input placeholder="Article url" />)}
                </Form.Item>
              </Col>
              <Col xs={24} sm={11}>
                <Form.Item label="Language">
                  {getFieldDecorator("language", {
                    initialValue: initialValues.language,
                    rules: [
                      { required: true, message: "Please select a language" }
                    ]
                  })(
                    <Select placeholder="Select a language">
                      {languages.map(language => (
                        <Select.Option key={language.id} value={language.id}>
                          {language.title}
                        </Select.Option>
                      ))}
                    </Select>
                  )}
                </Form.Item>

                <Form.Item label="Author">
                  {getFieldDecorator("author", {
                    initialValue: initialValues.author,
                    rules: [
                      { required: true, message: "Please select an author" }
                    ]
                  })(
                    <Select placeholder="Select an author">
                      {authors.map(author => (
                        <Select.Option key={author.id} value={author.id}>
                          {author.name}
                        </Select.Option>
                      ))}
                    </Select>
                  )}
                </Form.Item>

                <Form.Item label="Category">
                  {getFieldDecorator("category", {
                    initialValue: initialValues.category,
                    rules: [
                      { required: true, message: "Please select a category" }
                    ]
                  })(
                    <Select placeholder="Select a category">
                      {categories.map(category => (
                        <Select.Option key={category.id} value={category.id}>
                          {category.title}
                        </Select.Option>
                      ))}
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col xs={24} sm={{ span: 11, offset: 1 }}>
                <Form.Item label="Publication Date">
                  {getFieldDecorator("date", {
                    initialValue: initialValues.date
                      ? moment(initialValues.date)
                      : undefined,
                    rules: [
                      {
                        type: "object",
                        required: true,
                        message: "Please select publication date"
                      }
                    ]
                  })(<DatePicker />)}
                </Form.Item>

                <Form.Item label="Tags">
                  {getFieldDecorator("tags", {
                    initialValue: initialValues.tags
                      ? initialValues.tags.map(tag => tag)
                      : []
                  })(<Select mode="tags" placeholder="Tags for the post" />)}
                </Form.Item>

                <Form.Item label="Has Translation?" style={{ marginBottom: 0 }}>
                  {getFieldDecorator("hasTranslation", {
                    valuePropName: "checked",
                    initialValue: initialValues.hasTranslation || false
                  })(
                    <Switch
                      checkedChildren={<Icon type="check" />}
                      unCheckedChildren={<Icon type="cross" />}
                    />
                  )}
                </Form.Item>
              </Col>
            </Row>
          </Collapse.Panel>
          <Collapse.Panel header="List Preview & Images" key="previews">
            <Row>
              <Col xs={24} sm={11}>
                <Form.Item label="Preview image">
                  {getFieldDecorator("thumbImage", {
                    initialValue: initialValues.thumbImage || "",
                    rules: [
                      { required: true, message: "Preview image is required" }
                    ]
                  })(<Input placeholder="Url to the image" />)}
                </Form.Item>

                <Form.Item label="Preview text">
                  {getFieldDecorator("thumbText", {
                    initialValue: initialValues.thumbText || "",
                    rules: [
                      { required: true, message: "Preview text is required" }
                    ]
                  })(<Input.TextArea rows={5} />)}
                </Form.Item>
              </Col>
              <Col xs={24} sm={{ span: 11, offset: 1 }}>
                <Form.Item label="Fullscreen Video">
                  {getFieldDecorator("fullscreenVideo", {
                    initialValue: initialValues.fullscreenVideo || ""
                  })(<Input placeholder="Url to the video" />)}
                </Form.Item>

                <Form.Item label="Featured" style={{ marginBottom: 0 }}>
                  {getFieldDecorator("featured", {
                    valuePropName: "checked",
                    initialValue: initialValues.featured || false
                  })(
                    <Switch
                      checkedChildren={<Icon type="check" />}
                      unCheckedChildren={<Icon type="cross" />}
                    />
                  )}
                </Form.Item>
              </Col>
            </Row>
          </Collapse.Panel>
          <Collapse.Panel header="Social Networks" key="social">
            <Row>
              <Col xs={24} sm={11}>
                <Form.Item label="Facebook Share Preview">
                  {getFieldDecorator("ogImage", {
                    initialValue: initialValues.ogImage || "",
                    rules: [
                      {
                        required: true,
                        message: `It's crucial to have proper preview image if you share the post`
                      }
                    ]
                  })(<Input placeholder="Url to the image" />)}
                </Form.Item>
              </Col>
            </Row>
          </Collapse.Panel>
        </Collapse>
      </StyledForm>
    );
  }
}

export default Form.create({
  onValuesChange: (props, values) => {
    if (values.date) {
      props.onValuesChange({
        date: values.date.format("YYYY-MM-DD")
      });
      return;
    }
    props.onValuesChange(values);
  }
})(MetaEditor);
