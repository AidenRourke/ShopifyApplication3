import React, {Component} from 'react';
import axios from 'axios';
import styled from "styled-components";

import ItemList from "./ItemList";
import Search from "./svg/search"

import Button from "./components/Button"
import Input from "./components/Input"

const Header = styled.div`
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
  margin-top: 20px;
  background-color: #F8FEFA;
  flex: 1 1 auto;
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
        const {search, data} = this.state;
        let filteredData = [];
        if (search.length > 0) {
            filteredData = data.filter(item => item.keywords.split(",").some(key => key.trim().includes(search)));
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
            <div style={{height: "100%", display: "flex", flexFlow: "column"}}>
                <Header>Toronto Waste Lookup</Header>
                <div style={{display: "flex", flex: "0 0 auto", padding: "10px"}}>
                    <Input type="text"
                           value={this.state.search}
                           onChange={e => this.setState({search: e.target.value})}
                           style={{marginRight: "10px"}}
                           onKeyPress={this.handleKeyPress}/>
                    <Button onClick={this.filterData}><Search/></Button>
                </div>
                <ItemList setFavorite={this.setFavorite} items={filteredData}/>
                {
                    favourites.length > 0 && <Favorites>
                        <FavoritesHeader>Favourites</FavoritesHeader>
                        <ItemList favourites={true} setFavorite={this.setFavorite} items={favourites}/>
                    </Favorites>
                }
            </div>
        );
    };
}

export default App;
