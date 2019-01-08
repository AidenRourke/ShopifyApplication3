import React, {Component} from 'react';
import axios from 'axios';
import styled from "styled-components";

import ItemList from "./ItemList";

const Header = styled.div`
  margin-top: 10px;
  background: linear-gradient(to left, #4B9662, #2B5791);
  height: 100px;
  width: 100%;
  line-height: 100px;
  text-align: center;
  color: white;
  font-size: 30px;
`;

const Input = styled.input`
  height: 30px;
  font-size: 16px;
  margin: 10px;
  border-radius: 3px;
  border: 1px solid gray;
  padding: 0 10px;
`;

const Button = styled.div`
  background-color: #4B9662;
  margin: 10px;
  height: 30px;
  line-height: 30px;
  border-radius: 3px;
  color: white;
  text-align: center;
  display: inline-block;
  padding: 0 10px;
  cursor: pointer;
  &:hover{
    opacity: 0.9;
  }
`;


class App extends Component {
    state = {
        data: [],
        search: "",
        filteredData: []
    };

    async componentWillMount() {
        const req = await axios.get("https://secure.toronto.ca/cc_sr_v1/data/swm_waste_wizard_APR?limit=1000");
        req.data.map((item, i) => {
            item.id = i;
        });
        this.setState({data: req.data})

    }

    filterData = async () => {
        const {search, data} = this.state;

        if (search.length > 0) {
            const filteredData = [];
            data.map(item => {
                if (item.keywords.includes(search)) {
                    filteredData.push(item);
                }
            });
            this.setState({filteredData})
        }
    };

    render() {
        console.log(this.state.data);
        return (
            <div>
                <Header><b>Toronto Waste Lookup</b></Header>
                <Input type="text" value={this.state.search} onChange={e => this.setState({search: e.target.value})}/>
                <Button onClick={this.filterData}>Search</Button>
                <ItemList items={this.state.filteredData}/>
            </div>
        );
    };
}

export default App;
