import { decodeEntity } from "html-entities";
import parse from "html-react-parser";

const options = {
  replace: (domNode) => {
    if (domNode.attribs && domNode.attribs.class === "remove") {
      return <></>;
    }
  },
};

export const decodeHTML = (str) => parse(decodeEntity(str), options);
