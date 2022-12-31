export class OrderItem {
  constructor(
    orderItemId,
    orderItemStatus,
    orderItemTimestamp,
    orderItemQuantity,
    orderItemName,
    orderItemPrice,
    orderItemPicUrl,
    orderItemType,
    orderItemOption,
    orderItemNotes,
    subTotalFoodPrice,
    subTotalAddedValuePrice,
    subTotalPrice
  ) {
    this.orderItemId = orderItemId;
    this.orderItemStatus = orderItemStatus;
    this.orderItemTimestamp = orderItemTimestamp;
    this.orderItemQuantity = orderItemQuantity;
    this.orderItemName = orderItemName;
    this.orderItemPrice = orderItemPrice;
    this.orderItemPicUrl = orderItemPicUrl;
    this.orderItemType = orderItemType;
    this.orderItemOption = orderItemOption;
    this.orderItemNotes = orderItemNotes;
    this.subTotalFoodPrice = subTotalFoodPrice;
    this.subTotalAddedValuePrice = subTotalAddedValuePrice;
    this.subTotalPrice = subTotalPrice;
  }
}
