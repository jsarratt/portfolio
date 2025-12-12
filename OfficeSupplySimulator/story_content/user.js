window.InitUserScripts = function()
{
var player = GetPlayer();
var object = player.object;
var once = player.once;
var addToTimeline = player.addToTimeline;
var setVar = player.SetVar;
var getVar = player.GetVar;
var update = player.update;
var pointerX = player.pointerX;
var pointerY = player.pointerY;
var showPointer = player.showPointer;
var hidePointer = player.hidePointer;
var slideWidth = player.slideWidth;
var slideHeight = player.slideHeight;
window.Script1 = function()
{
  var player = GetPlayer();

// 1. Get values
var inkInput = player.GetVar("InkQty");
var budget = player.GetVar("budgetUsed");
var efficiency = player.GetVar("efficiencyScore");
var satisfaction = player.GetVar("satisfactionScore");
var log = player.GetVar("decisionLog");

// 2. Parse input
// Check if it is Not a Number (isNaN) OR if the field was left empty
var inkVal = parseFloat(inkInput);

if (!isNaN(inkVal)) {
    // SUCCESS: Perform calc and turn off error flag
    var newBudget = budget + (inkVal * 35);
    var totalInk = inkVal * 35);
       
     // efficiencyScore = efficiencyScore + (InkQty * 2)
    var newEfficiency = efficiency + (InkVal * 2);

    // satisfactionScore = satisfactionScore + (InkQty * 1)
    var newSatisfaction = satisfaction + (InkVal * 1);

    // decisionLog = decisionLog + "Ordered " + InkQty + " ink cartridges | "
    var newLog = log + "Ordered " + InkVal + " ink cartridges | ";

    
    // Explicitly set error to false so the layer doesn't show
    player.SetVar("InputError", false); 
    
    // --- Send results back to Storyline ---
    player.SetVar("budgetUsed", newBudget);
    player.SetVar("inkTotal", totalInk);
    player.SetVar("efficiencyScore", newEfficiency);
    player.SetVar("satisfactionScore", newSatisfaction);
    player.SetVar("decisionLog", newLog);


} else {
    // FAILURE: Turn on error flag
    player.SetVar("InputError", true);
}
}

window.Script2 = function()
{
  var player = GetPlayer();

// 1. Get current values from Storyline
var paperQtyInput = player.GetVar("paperQty");
var budget = player.GetVar("budgetUsed");
var efficiency = player.GetVar("efficiencyScore");
var satisfaction = player.GetVar("satisfactionScore");
var log = player.GetVar("decisionLog");

// 2. Parse the quantity input
var qtyVal = parseFloat(paperQtyInput);

// 3. Validate
if (!isNaN(qtyVal)) {

    // --- Perform Calculations ---
    
    // budgetUsed = budgetUsed + (paperQty * 8)
    var newBudget = budget + (qtyVal * 8);
    var paperTotal = inkVal * 35);

    // efficiencyScore = efficiencyScore + (paperQty * 1)
    var newEfficiency = efficiency + (qtyVal * 1);

    // satisfactionScore = satisfactionScore + (paperQty * 2)
    var newSatisfaction = satisfaction + (qtyVal * 2);

    // decisionLog = decisionLog + "Ordered " + paperQty + " paper reams | "
    var newLog = log + "Ordered " + qtyVal + " paper reams | ";

    // --- Send results back to Storyline ---
    player.SetVar("budgetUsed", newBudget);
    player.SetVar("totalPaper", paperTotal);
    player.SetVar("efficiencyScore", newEfficiency);
    player.SetVar("satisfactionScore", newSatisfaction);
    player.SetVar("decisionLog", newLog);

    // Reset error flag (if you are using the error layer technique)
    player.SetVar("InputError", false);

} else {
    // Trigger error if input is not a number
    player.SetVar("InputError", true);
}
}

window.Script3 = function()
{
  var player = GetPlayer();

// 1. Get current values
var snacksInput = player.GetVar("snacksQty");
var budget = player.GetVar("budgetUsed");
var satisfaction = player.GetVar("satisfactionScore");
var log = player.GetVar("decisionLog");

// 2. Parse the quantity input
var qtyVal = parseFloat(snacksInput);

// 3. Validate
if (!isNaN(qtyVal)) {

    // --- Perform Calculations ---
    
    // budgetUsed = budgetUsed + (snacksQty * 12)
    var newBudget = budget + (qtyVal * 12);
    var totalSnacks = qtyVal * 12;

    // satisfactionScore = satisfactionScore + (snacksQty * 3)
    // Note: Efficiency was not included in this request, so we skip it.
    var newSatisfaction = satisfaction + (qtyVal * 3);

    // decisionLog = decisionLog + "Ordered " + snacksQty + " snack boxes | "
    var newLog = log + "Ordered " + qtyVal + " snack boxes | ";

    // --- Send results back to Storyline ---
    player.SetVar("budgetUsed", newBudget);
    player.SetVar("snacksTotal", totalSnacks);
    player.SetVar("satisfactionScore", newSatisfaction);
    player.SetVar("decisionLog", newLog);

    // Reset error flag
    player.SetVar("InputError", false);

} else {
    // Trigger error if input is not a number
    player.SetVar("InputError", true);
}
}

window.Script4 = function()
{
  var player = GetPlayer();

// 1. Get the Token Counts
var supplies = player.GetVar("suppliesTokens");
var cleaning = player.GetVar("cleaningTokens");
var comfort = player.GetVar("comfortTokens");

// 2. Get the Current Scores
var efficiency = player.GetVar("efficiencyScore");
var satisfaction = player.GetVar("satisfactionScore");
var budget = player.GetVar("budgetUsed");
var log = player.GetVar("decisionLog");

// 3. Validation: Check if ALL are zero
if (supplies === 0 && cleaning === 0 && comfort === 0) {
    
    // VALIDATION FAILED
    // Set the error flag to True to trigger the layer
    player.SetVar("AllocationError", true);

} else {

    // VALIDATION PASSED
    
    // --- Perform Calculations ---
    
    // efficiencyScore: (supplies * 2) + (cleaning * 1)
    var newEfficiency = efficiency + (supplies * 2) + (cleaning * 1);

    // satisfactionScore: (comfort * 2)
    var newSatisfaction = satisfaction + (comfort * 2);

    // budgetUsed: Sum of all tokens * 5
    var totalTokens = supplies + cleaning + comfort;
    var newBudget = budget + (totalTokens * 5);

    // decisionLog: Append the text string
    var logEntry = "Allocation - Supplies:" + supplies + " Cleaning:" + cleaning + " Comfort:" + comfort + " | ";
    var newLog = log + logEntry;

    // --- Update Storyline Variables ---
    player.SetVar("efficiencyScore", newEfficiency);
    player.SetVar("satisfactionScore", newSatisfaction);
    player.SetVar("budgetUsed", newBudget);
    player.SetVar("decisionLog", newLog);

    // Turn off error flag (just in case)
    player.SetVar("AllocationError", false);
    
    // Optional: Jump to next slide or show a "Success" layer here
    // player.SetVar("MoveToNextSlide", true); 
}
}

window.Script5 = function()
{
  var player = GetPlayer();

// 1. Get current values
var efficiency = player.GetVar("efficiencyScore");
var satisfaction = player.GetVar("satisfactionScore");
var log = player.GetVar("decisionLog");

// 2. Perform Calculations
var newEfficiency = efficiency - 5;
var newSatisfaction = satisfaction - 10;
var newLog = log + "Delayed printer jam response | ";

// 3. Update Storyline
player.SetVar("efficiencyScore", newEfficiency);
player.SetVar("satisfactionScore", newSatisfaction);
player.SetVar("decisionLog", newLog);
}

window.Script6 = function()
{
  // 1. Get current values
var efficiency = player.GetVar("efficiencyScore");
var satisfaction = player.GetVar("satisfactionScore");
var log = player.GetVar("decisionLog");

// 2. Perform Calculations
var newEfficiency = efficiency + 10;
var newSatisfaction = satisfaction + 5;
var newLog = log + "Fixed jam immediately | ";

// 3. Update Storyline
player.SetVar("efficiencyScore", newEfficiency);
player.SetVar("satisfactionScore", newSatisfaction);
player.SetVar("decisionLog", newLog);

}

window.Script7 = function()
{
  // 1. Get current values
var efficiency = player.GetVar("efficiencyScore");
var satisfaction = player.GetVar("satisfactionScore");
var log = player.GetVar("decisionLog");

// 2. Perform Calculations
var newEfficiency = efficiency + 3;
var newSatisfaction = satisfaction + 1;
var newLog = log + "Asked IT for help | ";

// 3. Update Storyline
player.SetVar("efficiencyScore", newEfficiency);
player.SetVar("satisfactionScore", newSatisfaction);
player.SetVar("decisionLog", newLog);

}

window.Script8 = function()
{
  // 1. Get current values
var efficiency = player.GetVar("efficiencyScore");
var satisfaction = player.GetVar("satisfactionScore");
var log = player.GetVar("decisionLog");

// 2. Perform Calculations
var newEfficiency = efficiency - 5;
var newSatisfaction = satisfaction - 10;
var newLog = log + "Waited until lunch | ";

// 3. Update Storyline
player.SetVar("efficiencyScore", newEfficiency);
player.SetVar("satisfactionScore", newSatisfaction);
player.SetVar("decisionLog", newLog);

}

window.Script9 = function()
{
  var player = GetPlayer();
var text = player.GetVar("decisionLog");

var blob = new Blob([text], { type: "text/plain" });
var link = document.createElement("a");
link.href = URL.createObjectURL(blob);
link.download = "OfficeSupplySummary.txt";
link.click();
}

window.Script10 = function()
{
  var player = GetPlayer();

// --- Reset Scores ---
player.SetVar("efficiencyScore", 50);
player.SetVar("satisfactionScore", 50);

// --- Reset Budget ---
player.SetVar("budgetUsed", 0);

// --- Reset Inputs ---
player.SetVar("inkQty", 0);
player.SetVar("paperQty", 0);
player.SetVar("snacksQty", 0);

// --- Reset Tokens ---
player.SetVar("suppliesTokens", 0);
player.SetVar("cleaningTokens", 0);
player.SetVar("comfortTokens", 0);

// --- Reset Log ---
player.SetVar("decisionLog", "");

// Optional: Reset the error flag we created earlier
// player.SetVar("InputError", false);
}

};
