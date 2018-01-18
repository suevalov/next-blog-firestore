import React from "react";

const DISQUS_CONFIG = [
  "shortname",
  "identifier",
  "title",
  "url",
  "category_id",
  "onNewComment"
];
let __disqusAdded = false;

function copyProps(context, props, prefix = "") {
  Object.keys(props).forEach(prop => {
    context[prefix + prop] = props[prop];
  });

  if (typeof props.onNewComment === "function") {
    context[prefix + "config"] = function config() {
      this.callbacks.onNewComment = [
        function handleNewComment(comment) {
          props.onNewComment(comment);
        }
      ];
    };
  }
}

class DisqusThread extends React.Component {
  componentDidMount() {
    this.loadDisqus();
  }

  componentDidUpdate() {
    this.loadDisqus();
  }

  render() {
    const { onNewComment, ...restProps } = this.props;

    return (
      <div {...restProps}>
        <div id="disqus_thread" />
        <noscript>
          <span>
            Please enable JavaScript to view the
            <a href="http://disqus.com/?ref_noscript">
              comments powered by Disqus.
            </a>
          </span>
        </noscript>
        <a href="http://disqus.com" className="dsq-brlink">
          Blog comments powered by <span className="logo-disqus">Disqus</span>.
        </a>
      </div>
    );
  }

  addDisqusScript = () => {
    if (__disqusAdded) {
      return;
    }

    const child = (this.disqus = document.createElement("script"));
    const parent =
      document.getElementsByTagName("head")[0] ||
      document.getElementsByTagName("body")[0];

    child.async = true;
    child.type = "text/javascript";
    child.src = "//" + this.props.shortname + ".disqus.com/embed.js";

    parent.appendChild(child);
    __disqusAdded = true;
  };

  loadDisqus = () => {
    const props = {};

    // Extract Disqus props that were supplied to this component
    DISQUS_CONFIG.forEach(prop => {
      if (!!this.props[prop]) {
        props[prop] = this.props[prop];
      }
    });

    // Always set URL
    if (!props.url || !props.url.length) {
      props.url = window.location.href;
    }

    // If Disqus has already been added, reset it
    if (typeof window.DISQUS !== "undefined") {
      window.DISQUS.reset({
        reload: true,
        config: function config() {
          copyProps(this.page, props);

          // Disqus needs hashbang URL, see https://help.disqus.com/customer/portal/articles/472107
          this.page.url = this.page.url.replace(/#/, "") + "#!newthread";
        }
      });
    } else {
      // Otherwise add Disqus to the page
      copyProps(window, props, "disqus_");
      this.addDisqusScript();
    }
  };
}

DisqusThread.defaultProps = {
  shortname: null,
  identifier: null,
  title: null,
  url: null,
  category_id: null,
  onNewComment: null
};

export default DisqusThread;
