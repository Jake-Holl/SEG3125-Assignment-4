import { Card, CardActions, CardContent, CardMedia, Button, Typography } from "@mui/material"
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

function ItemCard({name, price, imageUrl, onSendData}){

    const handleClick = () => {
        onSendData({name, price, imageUrl})
    }

    return (
        <Card>
            <CardMedia 
            component='img'
            height='300'
            image={imageUrl}
            sx={{objectFit:'contain'}}
            />
            <CardContent>
                <Typography sx={{minHeight:'4rem'}} variant="h5" align='center'>{name}</Typography>
                <Typography variant="h6" align="center">{price}</Typography>
            </CardContent>
            <CardActions sx={{justifyContent:'center'}}>
                <Button onClick={handleClick} sx={{mb:2}} variant='contained' startIcon={<AddShoppingCartIcon />}>Add to cart</Button>
            </CardActions>
        </Card>
    )
}

export default ItemCard