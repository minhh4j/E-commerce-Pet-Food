export const endpoint = {
    AUTH: {
        LOGIN: '/login',
        REGISTER: '/register',
        LOGOUT: '/logout',
        ME: '/me'
    },
    PRODUCT: {
        GET_PRODUCTS: '/products',          
        GET_BY_ID: (id) => `/products/${id}`,
        SEARCH: '/products/search',        
    },
    WISHLIST: {
        GET_ALL: '/user/wishlist',
        ADD: (productId) => `/user/wishlist/${productId}`,
        REMOVE: (productId) => `/user/wishlist/${productId}`,
    },
    CART: {
        GET_ALL: '/user/cart',
        ADD_TO_CART: (productId) => `/user/cart/${productId}`,
        REMOVE_PRODUCT: (productId) => `/user/cart/${productId}`,
        UPDATE_QUANTITY: (productId, action) => `/user/cart/${productId}/${action}`,
    },
}

