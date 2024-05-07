// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-green; icon-glyph: magic;
let widget = await createWidget();

// Check where the script is running
if (config.runsInWidget) {
  // Runs inside a widget so add it to the homescreen widget
  Script.setWidget(widget);
} else {
  // Show the medium widget inside the app
  widget.presentSmall();
}
Script.complete();

async function createWidget() {
  // Create new empty ListWidget instance
  let listwidget = new ListWidget();

  // Add widget heading
  let heading = listwidget.addText("Sähkö nyt:");
  heading.centerAlignText();
  heading.font = Font.lightSystemFont(20);
  heading.textColor = new Color("#ffffff");
  
  // Spacer between heading and data
  listwidget.addSpacer(15);
  
  // Fetch price now
  let now = await getPriceNow();
  let price = formatPrice(now);

  // Add the price to the widget
  displayPrice(listwidget, price);

  // Return the created widget
  return listwidget;
}

async function getPriceNow() {
  // Query url
  const url = "https://api.spot-hinta.fi/JustNow";

  // Initialize new request
  const request = new Request(url);

  // Execute the request and parse the response as json
  const response = await request.loadJSON();

  // Return the returned data
  return response;
}

function formatPrice(pData) {
  // Parse data and return the price with 2 decimals
  const Price = pData.PriceWithTax * 100;
  return Price.toFixed(2);
}

function displayPrice(stack, price) {
    let pricestring = price + " c (sis. vero)";
    addTextElement(stack, pricestring);
    if (price < 10) {
        // Set background color green
        stack.backgroundColor = new Color("#008000");
    } else if (price > 20) {
        // Set background color red
        stack.backgroundColor = new Color("#EE4B2B");
    } else {
        // Set background color blue
        stack.backgroundColor = new Color("#0000FF");
    }
}

function addTextElement(stack, text) {
  let stackText = stack.addText(text);
  stackText.centerAlignText();
  stackText.font = Font.semiboldSystemFont(20);
  stackText.textColor = new Color("#ffffff");
}
