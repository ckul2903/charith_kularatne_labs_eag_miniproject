package com.summit.cart.service.impl;

import com.summit.cart.dto.exception.CartNotFoundException;
import com.summit.cart.dto.request.CartDTO;
import com.summit.cart.model.Cart;
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
public class implCartService implements CartService {

    private final CartRepository cartRepository;

    private final ModelMapper modelMapper;

    public List<Cart> getCarts(){
        try {
            log.info("CART SERVICE | Getting all carts");
            return cartRepository.findAll();
        } catch (Exception exception){
            log.error("CART SERVICE | Couldn't get all carts : {}", exception);
            throw exception;
        }
    }

    public Cart createCart(CartDTO cartDto){
        try {
            log.info("CART SERVICE | Creating new cart | ID:{}",cartDto.getCartId());
            Cart cart = modelMapper.map(cartDto,Cart.class);
            return cartRepository.save(cart);
        } catch (Exception exception) {
            log.error("CART SERVICE | Create failed : {}",exception);
            throw exception;
        }
    }

    public Cart getCartById(String cartId){
        try {
            log.info("CART SERVICE | Getting cart | ID:{}",cartId);
            return cartRepository.findById(cartId).orElseThrow(
                    ()-> new CartNotFoundException(cartId)
            );
        } catch (CartNotFoundException cartNotFoundException) {
            log.error("CART SERVICE | Cart not found | Cart ID:{} failed with exception {}",cartId,cartNotFoundException);
            throw cartNotFoundException;
        } catch (Exception exception){
            log.error("CART SERVICE | Query failed | Cart ID:{} failed with exception {}",cartId,exception);
            throw  exception;
        }
    }

    public void deleteCartById(String cartId){
        try {
            log.info("CART SERVICE | Deleting cart | ID:{}",cartId);
            if (cartRepository.existsById(cartId)){
                cartRepository.deleteById(cartId);
            }
            else {
                throw new CartNotFoundException(cartId);
            }
        }catch (CartNotFoundException exception) {
            log.error("CART SERVICE | Cart not found | Cart ID:{} failed with exception {}", cartId, exception);
            throw exception;
        } catch (Exception exception) {
            log.error("CART SERVICE | Delete failed | Cart ID:{} failed with exception{}", cartId, exception);
            throw exception;
        }
    }

    public void updateCart(CartDTO cartDto){
        try {
            log.info("CART SERVICE | Updating cart | ID:{}",cartDto.getCartId());
            if (cartRepository.existsById(cartDto.getCartId())){
                Cart cart = modelMapper.map(cartDto,Cart.class);
                cartRepository.save(cart);
            }
            else {
                throw new CartNotFoundException(cartDto.getCartId());
            }
        } catch (CartNotFoundException exception) {
            log.error("CART SERVICE | Cart not found | Cart ID:{} failed with exception {}", cartDto.getCartId(), exception);
            throw exception;
        }catch (Exception exception) {
            log.error("CART SERVICE | Update failed | Cart ID:{} failed with exception {}", cartDto.getCartId(), exception);
            throw exception;
        }
    }
}
