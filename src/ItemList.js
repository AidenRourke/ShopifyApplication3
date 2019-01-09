import React, {Component} from 'react';

import Item from "./components/Item"

export default class ItemList extends Component {

    render() {
        const {items, setFavorite, favorites = false} = this.props;

        return <>
            <div style={{flex: "0 1 auto"}}>
                {
                    items.map((item, i) =>
                        <Item key={i} setFavorite={setFavorite} item={item}/>
                    )
                }
            </div>
        </>
    }
}