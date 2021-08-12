const Order = require("./assignment1Order");

const OrderState = Object.freeze({
    WELCOMING:   Symbol("welcoming"),
    ITEM: Symbol("item"),
    SIZE:   Symbol("size"),
    TOPPINGS:   Symbol("toppings"),
    SAUCE:  Symbol("sauce"),
    DRINKS:  Symbol("drinks")
});

module.exports = class BurgerOrder extends Order{
    constructor(){
        super();
        this.stateCur = OrderState.WELCOMING;
        this.sItem = "Burger";
        this.sSize = "";
        this.sToppings = "";
        this.sSauce = "";
        this.sDrinks = "";
        this.foodprice = 0;
        this.foodsizeprice = 0;
        this.foodextraprice = 0;
        this.sauceprice = 0;
        this.drinksprice = 0;

    }

    handleInput(sInput){
        let aReturn = [];
        switch(this.stateCur){
            case OrderState.WELCOMING:
                this.stateCur = OrderState.ITEM;
                aReturn.push("Welcome to Shan's takeouts.");
                aReturn.push("What would you like, Burger($10) or Sandwich($15)?");      
                break;
            case OrderState.ITEM:
                this.stateCur = OrderState.SIZE;
                this.sItem = sInput;   
                aReturn.push("What size would you like? Choose Large(+$5) or Small.");
                if(sInput.toLowerCase() != "burger"){
                    this.foodprice = 15;
                }  else{
                    this.foodprice = 10;
                }
                break;
            case OrderState.SIZE:
                this.stateCur = OrderState.TOPPINGS;
                this.sSize = sInput;
                aReturn.push("Do you want to add extra pickles, tomatos or lettuce($1)? Say your choice or type no.");
                if(sInput.toLowerCase() != "small"){                                
                    this.foodsizeprice = 1;    
                }  
                break;
            case OrderState.TOPPINGS:
                this.stateCur = OrderState.SAUCE;
                this.sToppings = sInput; 
                aReturn.push("Do you want to add our special sauce($1)? Say [add sauce] or no."); 
                if(sInput.toLowerCase() != "no"){                                
                    this.foodextraprice = 1;    
                }  
                break;
            case OrderState.SAUCE:
                this.stateCur = OrderState.DRINKS;
                this.sSauce = sInput;
                if(sInput.toLowerCase() != "no"){
                    this.sauceprice = 1;
                }    
                aReturn.push("Would you like drinks($2) with that? Choose sprint, coke or no.");
                break;
            case OrderState.DRINKS:
                this.isDone(true);
                if(sInput.toLowerCase() != "no"){
                    this.sDrinks = sInput;
                    this.drinksprice = 2;
                }   
                aReturn.push("Thank-you for your order of");
                aReturn.push(`${this.sSize} ${this.sItem} with ${this.sToppings}`);
                if(this.sDrinks){
                    aReturn.push(this.sDrinks);
                }
                if(this.sSauce){
                    aReturn.push(this.sSauce);
                }
                let price = this.foodprice + this.foodsizeprice + this.foodextraprice + this.sauceprice + this.drinksprice;
                aReturn.push(`Your total is $ ${price}`);

                let d = new Date(); 
                d.setMinutes(d.getMinutes() + 20);
                aReturn.push(`Please pick it up at ${d.toTimeString()}`);
                break;
        }
        return aReturn;
    }
}