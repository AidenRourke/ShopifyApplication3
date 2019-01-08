import React, {Component} from 'react';
import styled from "styled-components";

import starIcon from "./svg/star.svg"

const Section = styled.div`
  width: 50%;
  display: inline-block;
  vertical-align: top;
`;

const SectionContainer = styled.div`
  padding: 10px;
  ul {
    margin: 0;
  }
`;

const IconContainer = styled.div`
  display: inline-block;
  margin-right: 10px;
`;

const Icon = styled.img`
  height: 15px;
  width: 15px;
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
        const {items} = this.props;

        return <div>
            {
                items.map(item =>
                    <SectionContainer>
                        <Section>
                            <IconContainer><Icon src={starIcon}/></IconContainer>
                            {item.title}
                        </Section>
                        <Section dangerouslySetInnerHTML={{__html: this.htmlDecode(item.body)}}/>
                    </SectionContainer>
                )
            }
        </div>
    }
}