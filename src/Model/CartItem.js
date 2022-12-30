export class CartItem {
  constructor(
    cartItemId,
    cartItemQuantity,
    cartItemName,
    cartItemPrice,
    cartItemPicUrl,
    cartItemType,
    cartItemOption,
    cartItemNotes,
    subTotalFoodPrice,
    subTotalAddedValuePrice,
    subTotalPrice
  ) {
    this.cartItemId = cartItemId;
    this.cartItemQuantity = cartItemQuantity;
    this.cartItemName = cartItemName;
    this.cartItemPrice = cartItemPrice;
    this.cartItemPicUrl = cartItemPicUrl;
    this.cartItemType = cartItemType;
    this.cartItemOption = cartItemOption;
    this.cartItemNotes = cartItemNotes;
    this.subTotalFoodPrice = subTotalFoodPrice;
    this.subTotalAddedValuePrice = subTotalAddedValuePrice;
    this.subTotalPrice = subTotalPrice;
  }
}
