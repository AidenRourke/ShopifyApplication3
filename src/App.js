import React, {Component} from 'react';
import axios from 'axios';
import styled from "styled-components";

import ItemList from "./ItemList";
import Search from "./svg/search"

const Header = styled.div`
  margin-top: 10px;
  background: linear-gradient(to left, #4B9662, #2B5791);
  height: 100px;
  width: 100%;
  line-height: 100px;
  text-align: center;
  color: white;
  font-size: 30px;
  font-weight: bold;
`;

const FavoritesHeader = styled.div`
  color: #4B9662;
  font-weight: bold;
  font-size: 30px;
  padding: 20px 10px 0px 10px;
`;

const Favorites = styled.div`
  background-color: #F8FEFA;
  flex: 1 1 auto;
`;

const Input = styled.input`
  flex: 1 1 auto;
  height: 40px;
  font-size: 16px;
  margin: 10px;
  border-radius: 3px;
  border: 1px solid gray;
  padding: 0 10px;
`;

const Button = styled.span`
  display: inline-block;
  background-color: #4B9662;
  box-shadow: 0 8px 6px -6px gray;
  margin: 10px;
  padding: 10px;
  height: 20px;
  width: 20px;
  border-radius: 3px;
  cursor: pointer;
  transform: scaleX(-1);
  border: 1px solid transparent;
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

    filterData = () => {
        // Improve filtering

        const {search, data} = this.state;
        const filteredData = [];

        if (search.length > 0) {
            data.map(item => {
                if (item.keywords.includes(search)) {
                    filteredData.push(item);
                }
            });
            this.setState({filteredData})
        } else {
            this.setState({filteredData})
        }
    };

    setFavorite = id => {
        const {data} = this.state;
        data.map(item => {
            if (item.id === id) {
                item.favorited = !item.favorited;
            }
        });
        this.setState({data})
    };

    handleKeyPress = e => {
        if (e.key === "Enter") {
            this.filterData();
        }
    };

    render() {
        const {filteredData, data} = this.state;
        const favourites = data.filter(item => item.favorited);
        return (
            <div style={{height: "100%"}}>
                <Header>Toronto Waste Lookup</Header>
                <div style={{display: "flex"}}>
                    <Input type="text" value={this.state.search} onChange={e => this.setState({search: e.target.value})}
                           onKeyPress={this.handleKeyPress}/>
                    <Button onClick={this.filterData}><Search/></Button>
                </div>
                <div style={{display: "flex", flexFlow: "column", height: "100%"}}>
                    <ItemList setFavorite={this.setFavorite} items={filteredData}/>
                    {
                        favourites.length > 0 && <Favorites>
                            <FavoritesHeader>Favourites</FavoritesHeader>
                            <ItemList setFavorite={this.setFavorite} items={favourites}/>
                        </Favorites>
                    }
                </div>
            </div>
        );
    };
}

export default App;
