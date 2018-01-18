import React from "react";
import { inject } from "mobx-react";
import moment from "moment";
import AdminPage from "~/components/admin/AdminPage";
import AdminPageSection from "~/components/admin/AdminPageSection";
import ProtectedPage from "~/pages/_hocs/ProtectedPage";
import ConnectedPage from "~/pages/_hocs/ConnectedPage";
import { Button } from "antd";
const { Header } = AdminPageSection;

function download(filename, text) {
  let pom = document.createElement("a");
  pom.setAttribute(
    "href",
    "data:text/plain;charset=utf-8," + encodeURIComponent(text)
  );
  pom.setAttribute("download", filename);

  if (document.createEvent) {
    let event = document.createEvent("MouseEvents");
    event.initEvent("click", true, true);
    pom.dispatchEvent(event);
  } else {
    pom.click();
  }
}

@inject("blog")
export class AdminSettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inProgress: false
    };
  }

  onBackupClick = () => {
    this.setState({ inProgress: true });
    this.props.blog
      .backup()
      .then(data => {
        download(
          `blog-backup-${moment().format("YYYY-MM-DD-hh-mm")}.json`,
          JSON.stringify(data, null, 2)
        );
        this.setState({ inProgress: false });
      })
      .catch(e => {
        this.setState({ inProgress: false });
      });
  };

  render() {
    return (
      <AdminPage user={this.props.user}>
        <AdminPageSection>
          <Header>General</Header>
          <Button
            loading={this.state.inProgress}
            size="large"
            type="primary"
            onClick={this.onBackupClick}
          >
            Create Backup
          </Button>
        </AdminPageSection>
      </AdminPage>
    );
  }
}

export default () => (
  <ConnectedPage>
    <ProtectedPage>{({ user }) => <AdminSettings user={user} />}</ProtectedPage>
  </ConnectedPage>
);
