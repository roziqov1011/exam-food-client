import {  gql } from '@apollo/client'



const COUNTRIES = gql`
query {
  categorys {
    id
    name
  }
}
`

const RESTARANS = gql`
  query restaran($categoryID: ID!){
    Restarans(categoryID: $categoryID) {
      id
      name
    }
  }
`
const BRANCHES = gql`
  query branche($restaranID: ID!){
    Branches(restaranID: $restaranID) {
      id
      name
    }
  }
`

const MENUS = gql`
  query menu($branchID: ID!){
    Menus(branchID: $branchID) {
      id
      name
      price
    }
  }
`






const ALL_MENU = gql`
query {
  allMenu {
    id
    name
    price
  }
}
`
const NEW_ORDER = gql`
mutation newOrder($order_id: String! $name: String! $price: Int!  ) {
  newOrder(order_id: $order_id name: $name price: $price  ) {
    order_id
    name
    price
  }
}
`

export  {
    COUNTRIES,
    RESTARANS,
    BRANCHES,
    MENUS,
    ALL_MENU,
    NEW_ORDER
}