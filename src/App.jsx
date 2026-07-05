import { useState, useEffect } from 'react'
import { Box, Grid, TextField, Button, Drawer, Typography, FormGroup, FormControlLabel, Checkbox, Divider, Stack, IconButton } from '@mui/material'
import ItemCard from './components/ItemCard.jsx'
import items from './items.json'
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import Survey from './components/Survey.jsx'

function App() {
  const [search, setSearch] = useState('')
  const [open, setOpen] = useState(false)
  const [openCart, setOpenCart] = useState(false)
  const [selectedfilters, setSelectedfilters] = useState({
    classic: false,
    summer: false,
    animal: false,
    food: false,
    space: false
  })

  const handleChange = (event) => {
    setSelectedfilters({
      ...selectedfilters,
      [event.target.name]: event.target.checked,
    });
  };

  const toggleFilters = (newOpen) => () => {
    setOpen(newOpen)
  }

  const toggleCart = (newOpen) => () => {
    setOpenCart(newOpen)
  }

  const [cart, setCart] = useState([])
  const [total, setTotal] = useState(0)
  useEffect(() => {
    let x = 0
    for(let i of cart){
      x += parseInt(i.price.slice(1))
    }
    setTotal('$' + x)
  }, [cart])

  const handleCardData = (data) => {
    setCart(prevList => [...prevList, data])
  }

  const removeItem = (remitem) => {
    setCart(prevList => prevList.filter(item => item !== remitem))
  }

  const [showcheckout, setShowcheckout] = useState(false)

  const {classic, summer, animal, food, space} = selectedfilters

  const [showsurvey, setShowsurvey] = useState(false)

  const applied = Object.keys(selectedfilters).filter(key => selectedfilters[key])

  return (
    <Box sx={{display:'flex', flexDirection:'column', gap:4, p:4}}>
      <Typography sx={{fontFamily:'Henny Penny'}} align='center' variant='h2'>Jake's Jellies</Typography>
      <Box sx={{display:'flex', justifyContent:'center', gap:4, flexDirection:{xs:'column-reverse', lg:'row'}}}>
        <Button startIcon={<FilterAltIcon />} onClick={toggleFilters(true)}>Filters</Button>
        <Box sx={{display:'flex', justifyContent:'center', gap:4, flexGrow:1}}>
          <TextField sx={{flexGrow:1}} id='search' label='Search' variant='outlined' value={search} onChange={(event) => setSearch(event.target.value)} />
          <Button startIcon={<ShoppingCartIcon />} onClick={toggleCart(true)}>My Cart</Button>
        </Box>
      </Box>
      <Box sx={{bgcolor:'primary.dark', borderRadius:2, boxShadow:5, p:2}}>
        <Typography sx={{color:'#fff'}} align='center' variant='h4'>DEAL! Spend 75$ or more for free shipping!</Typography>
      </Box>
      <Grid container spacing={3}> 
        {items.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
        .filter(item => applied.every(element => item.filter.includes(element)))
        .map(item => (
          <Grid size={{xs: 6, lg: 3}}><ItemCard onSendData={handleCardData} name={item.name} price={item.price} imageUrl={item.imageUrl}/></Grid>
        ))}
      </Grid>
      <Drawer open={open} onClose={toggleFilters(false)}> {/*Drawer for filters*/}
        <Box sx={{m:5, minWidth:'200px'}}>
          <Stack direction='row' sx={{justifyContent:'space-between'}}>
            <Typography variant='h4'>Filters</Typography>
            <IconButton color='black' onClick={toggleFilters(false)}><CloseIcon /></IconButton>
          </Stack>
          <Divider sx={{mb:3}}/>
          <FormGroup>
            <FormControlLabel control={<Checkbox checked={classic} onChange={handleChange} name='classic'/>} label="Classics"/>
            <FormControlLabel control={<Checkbox checked={summer} onChange={handleChange} name='summer'/>} label="Summer"/>
            <FormControlLabel control={<Checkbox checked={animal} onChange={handleChange} name='animal'/>} label="Animals"/>
            <FormControlLabel control={<Checkbox checked={food} onChange={handleChange} name='food'/>} label="Food"/>
            <FormControlLabel control={<Checkbox checked={space} onChange={handleChange} name='space'/>} label="Space"/>
          </FormGroup>
        </Box>
      </Drawer>
      <Drawer anchor='right' open={openCart} onClose={toggleCart(false)}> {/*Drawer for cart*/}
        <Box sx={{m:5, minWidth:'350px', minHeight:0.9, display:'flex', flexDirection:'column'}}>
          <Stack direction='row' sx={{justifyContent:'space-between'}}>
            <Typography variant='h4'>My Cart</Typography>
            <IconButton color='black' onClick={toggleCart(false)}><CloseIcon /></IconButton>
          </Stack>
          <Divider sx={{mb:3}}/>
          <Stack>
            {cart.map(item =>(
              <Stack width="100%" direction='row' sx={{alignItems:'center'}}>
                <Box sx={{objectFit:'contain', maxWidth:'75px', maxHeight:'75px'}} component='img' src={item.imageUrl}/>
                <Typography sx={{mr:'auto', pl:2}}>{item.name}</Typography>
                <Typography>{item.price}</Typography>
                <IconButton sx={{pb:1.5}} color="secondary" onClick={() => removeItem(item)}><DeleteIcon /></IconButton>
              </Stack>
            ))}
          </Stack>
          <Divider sx={{mt:'auto', mb:5}}/>
          <Stack width="100%" direction='row' sx={{alignItems:'center', justifyContent:"space-between", pb:3}}>
            <Typography sx={{pt:1}} variant='h5'>Total: {total}</Typography>
            <Button onClick={() => setShowcheckout(true)} variant='contained' startIcon={<ShoppingCartCheckoutIcon />}>Checkout</Button>
          </Stack>
          {showcheckout && <Stack sx={{pb:4}} spacing={2}>
            <TextField label='Credit Card Number'/>
            <TextField label='Expiration Date'/>
            <TextField label='CVV'/>
            <TextField label='Address'/>
            <TextField label='Name'/>
            <TextField label='Email Address'/>
            <Button onClick={() => {setShowsurvey(true); setOpenCart(false)}} variant='contained'>Submit</Button>
          </Stack>}
        </Box>
      </Drawer>
      <Survey show={showsurvey} setShow={setShowsurvey}/>
    </Box>
  )
}

export default App
