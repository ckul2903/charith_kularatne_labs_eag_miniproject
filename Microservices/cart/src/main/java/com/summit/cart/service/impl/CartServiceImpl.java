package com.summit.cart.service.impl;

import com.summit.cart.exception.CartNotFoundException;
import com.summit.cart.dto.CartDTO;
import com.summit.cart.exception.CartException;
import com.summit.cart.model.Cart;
import com.summit.cart.model.CartItem;
import com.summit.cart.repository.CartRepository;
import com.summit.cart.service.CartService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class CartServiceImpl implements CartService {

    private final CartRepository cartRepository;

    private final ModelMapper modelMapper;

    @Override
    public List<Cart> getCarts(){
        log.info("CART SERVICE | Getting all carts");
        try {
            return cartRepository.findAll();
        } catch (Exception exception){
            log.error("CART SERVICE | Couldn't get all carts : {}", exception.getMessage());
            throw new CartException();
        }
    }

    @Override
    public Cart createCart(CartDTO cartDto){
        try {
            Cart cart = modelMapper.map(cartDto,Cart.class);
            cart.setUserId(cart.getCartId());   // ONE USER HAS ONE CART IN THIS CASE
            Cart newCart = cartRepository.save(cart);
            log.info("CART SERVICE | Created new cart | ID:{}",cartDto.getCartId());
            return newCart;
        } catch (Exception exception) {
            log.error("CART SERVICE | Create failed : {}",exception.getMessage());
            throw new CartException();
        }
    }

    @Override
    public Cart getCartById(String cartId){
        log.info("CART SERVICE | Getting cart | ID:{}",cartId);
        try {
            return cartRepository.findById(cartId).orElseThrow(
                    ()-> new CartNotFoundException(cartId)
            );
        } catch (CartNotFoundException cartNotFoundException) {
            log.error("CART SERVICE | Cart not found | Cart ID:{} failed with exception {}",cartId,cartNotFoundException.getMessage());
            throw cartNotFoundException;
        } catch (Exception exception){
            log.error("CART SERVICE | Query failed | Cart ID:{} failed with exception {}",cartId,exception.getMessage());
            throw new CartException();
        }
    }

    @Override
    public void deleteCartById(String cartId){
        log.info("CART SERVICE | Deleting cart | ID:{}",cartId);
        try {
            cartRepository.deleteById(cartId);
        }catch (CartNotFoundException cartNotFoundException) {
            log.error("CART SERVICE | Cart not found | Cart ID:{} failed with exception {}", cartId, cartNotFoundException.getMessage());
            throw cartNotFoundException;
        } catch (Exception exception) {
            log.error("CART SERVICE | Delete failed | Cart ID:{} failed with exception{}", cartId, exception.getMessage());
            throw new CartException();
        }
    }

    @Override
    public Cart updateCart(String cartId,CartDTO cartDto){
        log.info("CART SERVICE | Updating cart | ID:{}",cartDto.getCartId());
        try {
            Cart cart = modelMapper.map(cartDto,Cart.class);
            cart.setCartId(cartId);
            cart.setUserId(cartId);

            for(CartItem item : cartDto.getCartItemList()){
                item.setCart(cart);
            }

            cart.setUserId(cartDto.getCartId());
            return cartRepository.save(cart);

        } catch (CartNotFoundException cartNotFoundException) {
            log.error("CART SERVICE | Cart not found | Cart ID:{} failed with exception {}", cartDto.getCartId(), cartNotFoundException.getMessage());
            throw cartNotFoundException;
        }catch (Exception exception) { 
            log.error("CART SERVICE | Update failed | Cart ID:{} failed with exception {}", cartDto.getCartId(), exception.getMessage());
            throw new CartException();
        }
    }
}
