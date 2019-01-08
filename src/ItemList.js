import React, {Component} from 'react';
import styled from "styled-components";

import Star from "./svg/star"

const Section = styled.div`
  width: 50%;
  display: inline-block;
  vertical-align: top;
`;

const SectionContainer = styled.div`
  padding: 10px;
  ul {
    margin: -10px 0;
    padding: 0;
  }
  li {
    margin: 10px 0;
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
      fill: ${props => props.favorited ? "#AAAAAA" : "#4B9662"};
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
        const {items, setFavorite} = this.props;

        return <div style={{flex: "0 1 auto"}}>
            {
                items.map((item, i) =>
                    <SectionContainer key={i}>
                        <Section>
                            <Icon favorited={!!item.favorited} onClick={() => setFavorite(item.id)}><Star/></Icon>
                            {item.title}
                        </Section>
                        <Section dangerouslySetInnerHTML={{__html: this.htmlDecode(item.body)}}/>
                    </SectionContainer>
                )
            }
        </div>
    }
}