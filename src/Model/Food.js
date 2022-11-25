export class Food{
    constructor(foodId, categoryId, groups, foodName, availability, mainPicture, foodPrice, addedPicture, foodDescription, tags, orderCount, totalSales){
        this.foodId = foodId;
        this.categoryId = categoryId;
        this.groups = groups;
        this.foodName = foodName;
        this.availability = availability;
        this.mainPicture = mainPicture;
        this.foodPrice = foodPrice;
        this.addedPicture = addedPicture;
        this.foodDescription = foodDescription;
        this.tags = tags;
        this.orderCount = orderCount;
        this.totalSales = totalSales;
    }
}