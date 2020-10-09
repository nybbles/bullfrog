import React, { FunctionComponent } from "react";
import { Typography } from "@material-ui/core";
import {
  RenderLeafProps,
  RenderElementProps,
  useSelected,
  useFocused,
} from "slate-react";
import { Section, SectionTitle } from "./Section";

export const Element: FunctionComponent<RenderElementProps> = ({
  attributes,
  children,
  element,
}) => {
  const props = {
    attributes: attributes,
    children: children,
    element: element,
  };

  switch (element.type) {
    case "section":
      return <Section {...props} />;
    case "section-title":
      return <SectionTitle {...props} />;
    case "block-quote":
      return (
        <blockquote {...attributes}>
          <Typography variant="body1">{children}</Typography>
        </blockquote>
      );
    case "bulleted-list":
      return <ul {...attributes}>{children}</ul>;
    case "heading-1":
      return (
        <Typography variant="h2" {...attributes}>
          {children}
        </Typography>
      );
    case "heading-2":
      return (
        <Typography variant="h3" {...attributes}>
          {children}
        </Typography>
      );
    case "list-item":
      return <li {...attributes}>{children}</li>;
    case "numbered-list":
      return <ol {...attributes}>{children}</ol>;
    default:
      return (
        <Typography variant="body1" paragraph={true} {...attributes}>
          {children}
        </Typography>
      );
  }
};

export const Leaf: FunctionComponent<RenderLeafProps> = ({
  attributes,
  children,
  leaf,
}) => {
  const selected = useSelected();
  const focused = useFocused();

  if (selected && focused) {
    children = <span className="selected>">{children}</span>;
  }

  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }
  if (leaf.code) {
    children = <code>{children}</code>;
  }
  if (leaf.italic) {
    children = <em>{children}</em>;
  }
  if (leaf.underline) {
    children = <u>{children}</u>;
  }
  return <span {...attributes}>{children}</span>;
};
