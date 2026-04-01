const PRODUCT_FRAGMENT = `
  fragment ProductFields on Product {
    id
    handle
    title
    description
    descriptionHtml
    vendor
    productType
    tags
    createdAt
    images(first: 5) {
      edges {
        node {
          url
          altText
          width
          height
        }
      }
    }
    variants(first: 1) {
      edges {
        node {
          id
          title
          availableForSale
          price {
            amount
            currencyCode
          }
        }
      }
    }
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
      maxVariantPrice {
        amount
        currencyCode
      }
    }
  }
`;

export const PRODUCTS_QUERY = `
  ${PRODUCT_FRAGMENT}
  query Products {
    products(first: 50) {
      edges {
        node {
          ...ProductFields
        }
      }
    }
  }
`;

export const PRODUCT_BY_HANDLE_QUERY = `
  ${PRODUCT_FRAGMENT}
  query ProductByHandle($handle: String!) {
    productByHandle(handle: $handle) {
      ...ProductFields
    }
  }
`;

export const PRODUCTS_BY_COLLECTION_QUERY = `
  ${PRODUCT_FRAGMENT}
  query ProductsByCollection($handle: String!) {
    collectionByHandle(handle: $handle) {
      id
      title
      products(first: 50) {
        edges {
          node {
            ...ProductFields
          }
        }
      }
    }
  }
`;

export const PRODUCTS_BY_VENDOR_QUERY = `
  ${PRODUCT_FRAGMENT}
  query ProductsByVendor($query: String!) {
    products(first: 50, query: $query) {
      edges {
        node {
          ...ProductFields
        }
      }
    }
  }
`;
