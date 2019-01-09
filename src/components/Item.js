import React, {Component} from 'react';
import styled from "styled-components";

import Star from "../svg/star"

const Section = styled.div`
  width: 50%;
  display: inline-block;
  vertical-align: top;
`;

const SectionContainer = styled.div`
  padding: 20px 10px;
  p {
    margin: 0;
  }
  ul {
    list-style-position: inside;
    padding: 0;
    margin: -10px 0;
    ul {
      padding-left: 40px;
    }
  }
  li {
    margin: 10px 0;
  }
  text {
    padding-left: 40px;
  }
`;

const Icon = styled.span`
  height: 15px;
  width: 15px;
  display: inline-block;
  margin-right: 10px;
  cursor: pointer;
  svg {
    fill: ${props => props.favorited ? "#4B9662" : "#AAAAAA"};
    &:hover {
      opacity: 0.8;
    }
  }
`;

export default class ItemList extends Component {
    htmlDecode = (input) => {
        const parser = new DOMParser();
        const dom = parser.parseFromString(
            '<!doctype html><body>' + input,
            'text/html');
        return dom.body.textContent;
    };

    render() {
        const {item, setFavorite} = this.props;

        return <SectionContainer>
            <Section>
                <Icon favorited={!!item.favorited} onClick={() => setFavorite(item.id)}><Star/></Icon>
                {item.title}
            </Section>
            <Section dangerouslySetInnerHTML={{__html: this.htmlDecode(item.body)}}/>
        </SectionContainer>
    }
}