import React from 'react';
import cardItemStyle from '../../src/styleMUI/item/cardItemPopular'
import Link from 'next/link';

const CardPopularItem = React.memo((props) => {
    const classes = cardItemStyle();
    const { element, widthPopularItem } = props;
    return (
        <div className={classes.card}>
            <div className={classes.chipList}>
                {
                    element.latest?
                        <div className={classes.chip} style={{color: 'white',background: 'green'}}>
                            Новинка
                        </div>
                        :null
                }
                {
                    element.hit?
                        <>
                        <div className={classes.chip} style={{color: 'black',background: 'yellow'}}>
                            Хит
                        </div>
                        </>
                        :null
                }
            </div>
            <Link href={{ pathname: '/catalog/[id]', query: { search: element.name} }} as={`/catalog/${element.organization._id}?search=${element.name}`}>
                <a>
                    <img
                        style={{width: widthPopularItem}}
                        className={classes.mediaPopular}
                        src={element.image}
                        alt={element.info}
                    />
                </a>
            </Link>
            <div className={classes.namePopular} style={{width: widthPopularItem-10}}>
                {element.name}
            </div>
        </div>
    );
})

export default CardPopularItem