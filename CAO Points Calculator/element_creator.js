const HLpointCalculation = [
    {min: 0, max:29, points: 0},
    {min: 30, max:39, points: 37},
    {min: 40, max:49, points: 46},
    {min: 50, max:59, points: 56},
    {min: 60, max:69, points: 66},
    {min: 70, max:79, points: 77},
    {min: 80, max:89, points: 88},
    {min: 90, max:100, points: 100}
];

const HLMathPointCalculation = [
    {min: 0, max:29, points: 0},
    {min: 30, max:39, points: 37},
    {min: 40, max:49, points: 71},
    {min: 50, max:59, points: 81},
    {min: 60, max:69, points: 91},
    {min: 70, max:79, points: 102},
    {min: 80, max:89, points: 113},
    {min: 90, max:100, points: 125}
];

const OLpointCalculation = [
    {min: 0, max:29, points: 0},
    {min: 30, max:39, points: 0},
    {min: 40, max:49, points: 12},
    {min: 50, max:59, points: 20},
    {min: 60, max:69, points: 28},
    {min: 70, max:79, points: 37},
    {min: 80, max:89, points: 46},
    {min: 90, max:100, points: 56}
];

function getTopN(array, N){
    let tempArray = [...array].sort((a,b) => b-a).slice(0,N);
    return tempArray
}

function addUpArray(array){
    let sum = 0;    
    for(let i = 0; i < array.length; i++){
        sum += array[i];
    }
    return sum;
}



const subjectSliderRefs = [];
function calculatePoints() {
    //Calculate points for each subjects and add to list
    let points = [];



    let total = 0
    for (const sliderOBJ of subjectSliderRefs){
        result = Number(sliderOBJ.Reference.value);
        if (sliderOBJ.HL.checked == true){
            if (sliderOBJ.name == "Maths"){
                for (const rule of HLMathPointCalculation){
                    if (result >= rule.min && result <= rule.max){
                        sliderOBJ.pointsTXTRef.textContent = rule.points + " points";
                        points.push(rule.points);
                        //total += rule.points;
                    }
                }
            }else{
                for (const rule of HLpointCalculation){
                    if (result >= rule.min && result <= rule.max){
                        sliderOBJ.pointsTXTRef.textContent = rule.points + " points";
                        points.push(rule.points);
                        //total += rule.points;
                    }
                }
            }
        }else{
            for (const rule of OLpointCalculation){
                if (result >= rule.min && result <= rule.max){
                    sliderOBJ.pointsTXTRef.textContent = rule.points + " points";
                    points.push(rule.points);
                    //total += rule.points;
                }
            }
        }
    }

    if(points.length > 6){
        let topSix = getTopN(points,6);
        
        //Highlight scores in top six
        let tempArray = [...topSix]
        for(const sliderOBJ of subjectSliderRefs){
            if (tempArray.includes(parseInt(sliderOBJ.pointsTXTRef.textContent))){
                console.log("Found!");
                sliderOBJ.Reference.parentElement.parentElement.parentElement.classList.add("selected");
                tempArray.splice(tempArray.indexOf(parseInt(sliderOBJ.pointsTXTRef.textContent)),1)
            }
            else{
                sliderOBJ.Reference.parentElement.parentElement.parentElement.classList.remove("selected");
            }
        }


        total = addUpArray(topSix);
    }else{
        for(const sliderOBJ of subjectSliderRefs){
            sliderOBJ.Reference.parentElement.parentElement.parentElement.classList.remove("selected");
        }
        total = addUpArray(points);
    }



    document.getElementById("totalPointsTXT").textContent = total;
};

const subjectNameTBOX = document.getElementById("subjectNameTBOX");
const container = document.getElementById("container");

addNewElement("Maths", false);


function addNewElement(subject, removable) {
    //Create divs
    const subjectContainer = document.createElement("div");
    subjectContainer.className = "subject-container";
    container.appendChild(subjectContainer);

    const infoContainer = document.createElement("div");
    infoContainer.className = "subject-info";
    

    const detailsContainer = document.createElement("div");
    detailsContainer.className = "subject-details";
    infoContainer.appendChild(detailsContainer);

    
    const checkBoxContainer = document.createElement("div");
    checkBoxContainer.className = "subject-checkBoxArea";
    infoContainer.appendChild(checkBoxContainer);
    
    const sliderResultContainer = document.createElement("div");
    sliderResultContainer.className = "subject-sliderResult";
    infoContainer.appendChild(sliderResultContainer);

    const subjectName = document.createElement("span");
    subjectName.className = "subject-name";
    subjectName.textContent = subject;


    //Checkbox + points
    const detailsRightContainer = document.createElement("div");
    detailsRightContainer.className = "subject-detailsRight";

    //Checkbox label + checkbox
    const CHKBOXText = document.createElement("span");
    CHKBOXText.textContent = "Higher Level?";

    const higherlevelCHKBOX = document.createElement("input");
    higherlevelCHKBOX.type = "checkbox";
    higherlevelCHKBOX.addEventListener("change",changeSubjectResultTxt);

    checkBoxContainer.appendChild(CHKBOXText);
    checkBoxContainer.appendChild(higherlevelCHKBOX);
    //detailsRightContainer.appendChild(checkBoxContainer);

    const subjectPoints = document.createElement("span");
    subjectPoints.className = "subject-points";


    


    const subjectResultSlider = document.createElement("input");
    subjectResultSlider.className = "subject-slider";
    subjectResultSlider.type = "range";
    subjectResultSlider.min = 0;
    subjectResultSlider.max = 100;
    subjectResultSlider.value = 50;

    subjectSliderRefs.push({Reference: subjectResultSlider, pointsTXTRef: subjectPoints, HL: higherlevelCHKBOX, name:subject});

    const subjectResult = document.createElement("span");
    subjectResult.className = "subject-precentage";
    subjectResult.textContent = subjectResultSlider.value + "%";

    
    function changeSubjectResultTxt() {
        subjectResult.textContent = subjectResultSlider.value + "%";
        calculatePoints();
    };
    subjectResultSlider.addEventListener("input", changeSubjectResultTxt);
    




    detailsContainer.appendChild(subjectName);
    detailsContainer.appendChild(subjectPoints);
    
    

    const buttonArea = document.createElement("div");
    buttonArea.className = "subject-buttonArea";

    if (removable){
        const removeSubjectBTN = document.createElement("button");
        removeSubjectBTN.type = "button";
        removeSubjectBTN.textContent = "X"
    
        function removeSubject(){
            subjectContainer.remove();
            subjectSliderRefs.splice(subjectSliderRefs.indexOf(subjectResultSlider),1);
            calculatePoints();
        };
    
        removeSubjectBTN.addEventListener("click", removeSubject);
        removeSubjectBTN.className = "subject-removeButton";
        buttonArea.appendChild(removeSubjectBTN);
    }
    subjectContainer.appendChild(buttonArea);
    sliderResultContainer.appendChild(subjectResultSlider);
    sliderResultContainer.appendChild(subjectResult);
    subjectContainer.appendChild(infoContainer);


    
    calculatePoints();
}



document.getElementById("addSubjectBTN").addEventListener("click", function(){
    addNewElement(subjectNameTBOX.value, true);
});
