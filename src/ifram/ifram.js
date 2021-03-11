import React, { Component } from "react";
import Iframe from "react-iframe";

class Ifram extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nowiframe: "",
    };
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (this.props.clickifram !== prevProps.clickifram) {
      this.setState(
        {
          ...this.state,
          selectTagNum: -1,
          //   nowiframe: this.props.clickifram,
        },
        () => {
          if (this.props.clickifram === "전자신문") {
            this.setState({
              nowiframe: "https://www.etnews.com/",
            });
          } else if (this.props.clickifram === "ZDnet") {
            this.setState({
              nowiframe: "https://zdnet.co.kr/news/?lstcode=0000",
            });
          } else if (this.props.clickifram === "블로터") {
            this.setState({
              nowiframe: "http://www.bloter.net/",
            });
          } else if (this.props.clickifram === "씨넷코리아") {
            this.setState({
              nowiframe: "https://www.cnet.co.kr/",
            });
          } else if (this.props.clickifram === "IT World") {
            this.setState({
              nowiframe: "https://www.itworld.co.kr/main/",
            });
          } else if (this.props.clickifram === "디지털데일리") {
            this.setState({
              nowiframe: "http://www.ddaily.co.kr/",
            });
          } else if (this.props.clickifram === "얼리어답터") {
            this.setState({
              nowiframe: "https://www.eanews.kr/",
            });
          } else if (this.props.clickifram === "IT조선") {
            this.setState({
              nowiframe: "http://it.chosun.com/",
            });
          } else if (this.props.clickifram === "IT뉴스") {
            this.setState({
              nowiframe: "http://www.itnews.or.kr/",
            });
          } else if (this.props.clickifram === "IT DALY") {
            this.setState({
              nowiframe: "https://www.itdaily.kr/",
            });
          } else if (this.props.clickifram === "PC사랑") {
            this.setState({
              nowiframe: "https://www.ilovepc.co.kr/",
            });
          } else if (this.props.clickifram === "로켓펀치") {
            this.setState({
              nowiframe: "https://www.rocketpunch.com/jobs",
            });
          } else if (this.props.clickifram === "원티드") {
            this.setState({
              nowiframe: "https://www.wanted.co.kr/newintro",
            });
          } else if (this.props.clickifram === "프로그래머스") {
            this.setState({
              nowiframe:
                "https://programmers.co.kr/?utm_source=google&utm_medium=cpc&utm_campaign=coding_test&gclid=Cj0KCQiA1KiBBhCcARIsAPWqoSrx2jI2-SSiCiPQLZB2zB4UkKGIWKZDRQpoqyCsDUvQk8zfjbttGjUaAtfiEALw_wcB",
            });
          } else if (this.props.clickifram === "사람인") {
            this.setState({
              nowiframe:
                "https://www.saramin.co.kr/zf_user/jobs/list/job-category?cat_bcd=4",
            });
          } else if (this.props.clickifram === "잡코리아") {
            this.setState({
              nowiframe:
                "https://www.jobkorea.co.kr/recruit/joblist?menucode=duty&dutyCtgr=10016",
            });
          } else if (this.props.clickifram === "와글") {
            this.setState({
              nowiframe:
                "http://portal.changwon.ac.kr/portalMain/mainSub.do?homecd=portal&bno=1293",
            });
          } else {
          }
        }
      );
    }
  };

  render() {
    return (
      <div style={{ width: "100%" }}>
        <Iframe
          url={this.state.nowiframe}
          width="100%"
          height="1700"
          id="myId"
          //   className="myClassname"
          display="initial"
          position="relative"
          //   type="text/html"
          type="text/javascript"
        />
      </div>
    );
  }
}

export default Ifram;
