// LICENCE -----------------------------------------------------------------------------

// Copyright 2024 - Maude Tagand & Dominique Muller

// Initialize jsPsych -----------------------------------------------------------------
var jsPsych = initJsPsych({
});

// Browser exclusion ------------------------------------------------------------------
var browser_check = {
  type: jsPsychBrowserCheck,
  inclusion_function: (data) => {
    return data.browser === 'firefox'|| data.browser === 'chrome' && data.mobile === false
  },
  exclusion_message: (data) => {
    if(data.mobile){
      return "p>You must use a desktop/laptop computer to participate in this experiment.</p>";
    } else if (data.browser !== 'firefox' && data.browser !== 'chrome'){
      return "<p>You must use Chrome or Firefox to complete this experiment.</p>"+
             "<p>If you would like to take part in our study, please copy and paste the experiment link into one of the compatible browsers.</p>";
    }
  }
};

// Create Timeline --------------------------------------------------------------------------
var timeline = [];

// Welcome
var welcome = {
  type: jsPsychHtmlButtonResponse,
  stimulus:
    "<h1 class ='custom-title'>Welcome</h1>" +
    "<p class='instructions'>Thank you for taking part in this survey. <b> Please note that you can only participate from a computer.</b> </p>" +
    "<p class='instructions'>We are going to ask you to imagine you are a medical researcher who wants to test the effectiveness of a medicine against a fictitious disease. " +
    "Your task will be to give your opinion on the effectiveness of this medicine. You will also have to answer some questions about your worldview.</p>" +
    "<p class='instructions'>If you have any question related to this research, please " +
    "send a message on Prolific. </p>" +

    "<p class = 'continue-instructions'>Click <strong>Continue</strong> to start the study.</p>",
  choices: ['Continue']
};

var consent = {
  type: jsPsychHtmlButtonResponse,
  stimulus:
  "<h1 class ='custom-title'> Informed consent </h1>" +
    "<p class='instructions'>By clicking below to start the study, you recognize that:</p>" +
      "<ul class='instructions'>" +
        "<li>You know you can stop your participation at any time, without having to justify yourself. " +
        "However, keep in mind that you have to complete the whole study in order to be paid.</li>" +
        "<li>You know you can contact our team for any questions or dissatisfaction related to your " +
        "participation in the research via Prolific.</li>" +
        "<li>You know the data collected will be strictly confidential and it will be impossible for " +
        "any unauthorized third party to identify you.</li>" +
        "<li>Please note that there will be one or several questions to check that you read instructions carefully. " +
        "If you do not answer this or these (very simple) questions correctly, you might not be paid. " +
        "<li>You must be over 18 to participate. " +
      "</ul>" +
    "<p class='instructions'>By clicking on the \"I confirm\" button, you give your free and informed consent to participate " +
    "in this research.</p>",
  choices: ['I confirm']
};

var consigne = {
  type: jsPsychHtmlButtonResponse,
  stimulus:
  "<p class= 'instructions_questionnary bold'>Please read these instructions very carefully.</p>" +
  "<p class= 'instructions_questionnary'>Imagine you are a medical researcher looking for a cure for a (fictional) disease called the Vonne syndrome. " + 
  "You just found a medicine that you think could work and your role will be to determine whether this medicine is effective or not. " +
  "<p class= 'instructions_questionnary'>To do so, you will see patients suffering from the disease one by one, and depending on the instructions, you will have to give them either the medicine or a placebo, " +
  "that is to say a pill that resembles the medicine but does not contain any substance affecting health (it is generally with this type of pill that a medicine is compared to in order to judge its effectiveness).</p>" + //retour à la ligne
  "<p class= 'instructions_questionnary'>You will test a certain number of patients to determine the effectiveness of medicine.</p>",
  choices: ['I have read carefully and I can start the study']
};

var stim = [
  {pilule: "medicine", correct_button: 0, diagnostic: "recovered", image: "jspsych/img/healthypeople.jpg", med_score: 1, pla_score: 0, pro: "medicine"},
  {pilule: "medicine", correct_button: 0, diagnostic: "recovered", image: "jspsych/img/healthypeople.jpg", med_score: 1, pla_score: 0, pro: "medicine"},
  {pilule: "medicine", correct_button: 0, diagnostic: "not recovered", image: "jspsych/img/sickpeople.jpg", med_score: -1, pla_score: 0, pro: "placebo"},
  {pilule: "placebo", correct_button: 1, diagnostic: "recovered", image: "jspsych/img/healthypeople.jpg", med_score: 0, pla_score: 1, pro: "placebo"},
  {pilule: "placebo", correct_button: 1, diagnostic: "recovered", image: "jspsych/img/healthypeople.jpg", med_score: 0, pla_score: 1, pro: "placebo"},
  {pilule: "placebo", correct_button: 1, diagnostic: "not recovered", image: "jspsych/img/sickpeople.jpg", med_score: 0, pla_score: -1, pro: "medicine"}
]

var button_randomization = jsPsych.randomization.sampleWithoutReplacement(["medicine_high", "medicine_low"], 1)[0]

var label_randomization = jsPsych.randomization.sampleWithoutReplacement(["medicine_left", "medicine_right"], 1)[0]

var pro_medicine = stim.filter(function(s){return s.pro === "medicine"; });
var pro_placebo = stim.filter(function(s){return s.pro === "placebo"; });

var pro_medicine_randomization = jsPsych.randomization.repeat(pro_medicine, 4);
var pro_placebo_randomization = jsPsych.randomization.repeat(pro_placebo, 4);

var order_randomization = jsPsych.randomization.sampleWithoutReplacement(["pro_medicine_first", "pro_placebo_first"], 1)[0]
var stim_randomization = [];

if (order_randomization == "pro_medicine_first"){
  stim_randomization.push(
    pro_medicine_randomization.pop(),
    pro_medicine_randomization.pop(),
    pro_medicine_randomization.pop(),
    pro_placebo_randomization.pop(),

    pro_medicine_randomization.pop(),
    pro_medicine_randomization.pop(),
    pro_placebo_randomization.pop(),
    pro_medicine_randomization.pop(),

    pro_medicine_randomization.pop(),
    pro_placebo_randomization.pop(),
    pro_medicine_randomization.pop(),
    pro_medicine_randomization.pop(),

    pro_placebo_randomization.pop(),
    pro_placebo_randomization.pop(),
    pro_placebo_randomization.pop(),
    pro_medicine_randomization.pop(),

    pro_placebo_randomization.pop(),
    pro_placebo_randomization.pop(),
    pro_medicine_randomization.pop(),
    pro_placebo_randomization.pop(),

    pro_placebo_randomization.pop(),
    pro_medicine_randomization.pop(),
    pro_placebo_randomization.pop(),
    pro_placebo_randomization.pop());

} else if (order_randomization == "pro_placebo_first"){
  stim_randomization.push(
    pro_placebo_randomization.pop(),
    pro_placebo_randomization.pop(),
    pro_placebo_randomization.pop(),
    pro_medicine_randomization.pop(),

    pro_placebo_randomization.pop(),
    pro_placebo_randomization.pop(),
    pro_medicine_randomization.pop(),
    pro_placebo_randomization.pop(),

    pro_placebo_randomization.pop(),
    pro_medicine_randomization.pop(),
    pro_placebo_randomization.pop(),
    pro_placebo_randomization.pop(),

    pro_medicine_randomization.pop(),
    pro_medicine_randomization.pop(),
    pro_medicine_randomization.pop(),
    pro_placebo_randomization.pop(),

    pro_medicine_randomization.pop(),
    pro_medicine_randomization.pop(),
    pro_placebo_randomization.pop(),
    pro_medicine_randomization.pop(),

    pro_medicine_randomization.pop(),
    pro_placebo_randomization.pop(),
    pro_medicine_randomization.pop(),
    pro_medicine_randomization.pop());
};

var pilule_given = {
  type : jsPsychImageButtonResponse,
  stimulus: "jspsych/img/sickpeople.jpg",
  stimulus_width: 250,
  choices: [
    `<div class='choice-container'><img style='width: 100px;' src='jspsych/img/pilule.png'><div class='choice-text'>Medicine</div></div>`,
    `<div class='choice-container'><img style='width: 100px;' src='jspsych/img/pilule.png'><div class='choice-text'>Placebo</div></div>`
    ],
  prompt: function() {
  return `<p class='instructions'>You give the ${jsPsych.timelineVariable('pilule')} to the patient.</p>`
  }
};

var loop_pilule = {
  timeline: [pilule_given],
  loop_function: function(){
    var response = jsPsych.data.get().last().values()[0].response;
    var correct_button = jsPsych.timelineVariable('correct_button')
    if (response == correct_button){
      return false;
    } else {
      return true;
    }
  }
};

var feedback = {
  type: jsPsychHtmlButtonResponse,
  stimulus: function(){
    return `
    <img style= 'width: 250px;' src="${jsPsych.timelineVariable('image')}"></img>
    <p class='instructions'>The patient has ${jsPsych.timelineVariable('diagnostic')}!</p>`;
  },
  choices: ['Continue'],
};

var procedure_testing = {
  timeline: [loop_pilule, feedback],
  timeline_variables: stim_randomization,
  data: {
    pilule: jsPsych.timelineVariable('pilule'),
    diagnostic: jsPsych.timelineVariable('diagnostic'),
    med_score: jsPsych.timelineVariable('med_score'),
    pla_score: jsPsych.timelineVariable('pla_score')
  },
};

var question = {
  type: jsPsychSurveyMultiChoice,
  questions: [
    {
      prompt: "<p>On the basis of the information you have gathered, you think that:</p>",
      options: function(){if (button_randomization == "medicine_high"){
        return [
          "Patients have a better chance of recovery with the medicine",
          "Patients have as much chance of recovery with the medicine as with the placebo",
          "Patients have a better chance of recovery with the placebo"
          ];
      } else if (button_randomization == "medicine_low"){
        return [
          "Patients have a better chance of recovery with the placebo",
          "Patients have as much chance of recovery with the medicine as with the placebo",
          "Patients have a better chance of recovery with the medicine"
        ];
      } else {
        return "<p>Erreur : réponse inattendue.</p>";
      }
    },
    required: true // This makes the question required
  }
]
};

var slider = {
  type: jsPsychHtmlSliderResponse,
  slider_start: 1,
  require_movement: true,
  min: 1,
  max: 50,
  step: 1,
  labels: [
    '1<br>More likely', 
    '25<br>Clearly more likely',
    '50<br>Massively more likely'
  ],
  stimulus: function() {
    var response = jsPsych.data.get().last().values()[0].response.Q0;
    var question_text = "";
    if (response == "Patients have a better chance of recovery with the medicine") {
      question_text = "How likely do you think people are to get better with the medicine?";
    } else if (response == "Patients have a better chance of recovery with the placebo") {
      question_text = "How likely do you think people are to get better with the placebo?";
    } else {
      question_text = "Erreur : réponse inattendue.";
    }

    // Only return the question text here
    return `
        <p style="margin-bottom: 1px;">${question_text}</p>
        <p style="text-align: center; margin-top: 0px !important;"><em>(If you want to answer 1, simply click on the handle)</em></p>`;
  },
  slider_width: 350 // Keep this as is to control slider size
};

var conditional_slider = {
  timeline: [slider],
  conditional_function: function() {
    var response = jsPsych.data.get().last().values()[0].response.Q0;
    if (response == "Patients have as much chance of recovery with the medicine as with the placebo") {
      return false;
    } else {
      return true;
    }
  }
};

//Attention check
var attention_check = {
  type: jsPsychSurveyText,
  questions: [
    {
      prompt: "<p class='instructions_questionnary'>This question is here to check that you read the instructions carefully. On this page, we will ask you only one question, but you will not answer it. Instead, just write the word \u0022baguette\u0022. </p>" +
              "<p class='instructions_questionnary'>What is your favorite color?</p>",
      name: 'attention_check',
      required: true
    }
  ],
  button_label: 'Continue',
};

//Survey
var instruction_questionnary = {
  type: jsPsychHtmlButtonResponse,
  stimulus:
    "<p class='instructions_questionnary'>The first part of this study has been completed. You will now have to answer a series of questions about your points of view and personality.</p>",
    choices: ['Continue']
};

///Questionnary cmq
var cmq_label = [
  "<br>0%<br><br>certainly not", 
  "<br>10%<br><br>extremely unlikely",
  "<br>20%<br><br>very unlikely",
  "<br>30%<br><br>unlikely",
  "<br>40%<br><br>somewhat unlikely",
  "<br>50%<br><br>undecided",
  "<br>60%<br><br>somewhat likely",
  "<br>70%<br><br>likely",
  "<br>80%<br><br>very likely", 
  "<br>90%<br><br>extremely likely", 
  "<br>100%<br><br>certainly"
  ];
          
var cmq_questionnary = {
  type: jsPsychSurveyLikert,
  preamble:
  "<p class='instructions_questionnary'>For each statement below, please choose the appropriate number to indicate the extent to which you think these statements are true.</br></p>"+ 
  "<p class='instructions_questionnary'>There is no objectively true or false answer, we are interested in your personal opinions.</p>"+
  "<p class='instructions_questionnary'>I think that...",
  questions: [
       {prompt: "...many very important things happen in the world, which the public is never informed about.", name: 'cmq_1', labels: cmq_label, required: true},
       {prompt: "...politicians usually do not tell us the true motives for their decisions.", name: 'cmq_2', labels: cmq_label, required: true},
       {prompt: "...government agencies closely monitor all citizens.", name: 'cmq_3', labels: cmq_label, required: true},
       {prompt: "...events which superficially seem to lack a connection are often the result of secret activities.", name: 'cmq_4', labels: cmq_label, required: true},
       {prompt: "...there are secret organizations that greatly influence political decisions.", name: 'cmq_5', labels: cmq_label, required: true},  
  ],
  required_error: "Please, answer all questions.",
  button_label: 'Continue'
};

var bcti_label = [
  "<br>1<br><br>Completely false",
  "<br>2",
  "<br>3",
  "<br>4",
  "<br>5",
  "<br>6",
  "<br>7",
  "<br>8",
  "<br>9<br><br>Completely true",
  ];
          
var bcti_questionnary = {
  type: jsPsychSurveyLikert,
  preamble:
  "<p class='instructions_questionnary'>For each statement below, please choose the appropriate number to indicate the extent to which you think these statements are true.</br></p>"+ 
  "<p class='instructions_questionnary'>There is no objectively true or false answer, we are interested in your personal opinions.</p>"+
  "<p class='instructions_questionnary'>I think that...</p>",
  questions: [
       {prompt: "A powerful and secretive group, known as the New World Order, are planning to eventually rule the world through an autonomous world government, which would replace sovereign government.", name: 'bcti_1', labels: bcti_label, required: true},
       {prompt: "SARS (Severe Acute Respiratory Syndrome) was produced under laboratory conditions as a biological weapon.", name: 'bcti_2', labels: bcti_label, required: true},
       {prompt: "The US government had foreknowledge about the Japanese attack on Pearl Harbour, but allowed the attack to take place so as to be able to enter the Second World War.", name: 'bcti_3', labels: bcti_label, required: true},
       {prompt: "US agencies intentionally created the AIDS epidemic and administered it to Black and gay men in the 1970s.", name: 'bcti_4', labels: bcti_label, required: true},
       {prompt: "The assassination of Martin Luther King, Jr., was the result of an organised conspiracy by US government agencies such as the CIA and FBI.", name: 'bcti_5', labels: bcti_label, required: true}, 
       {prompt: "The Apollo moon landings never happened and were staged in a Hollywood film studio.", name: 'bcti_6', labels: bcti_label, required: true}, 
       {prompt: "Area 51 in Nevada, US, is a secretive military base that contains hidden alien spacecraft and/or alien bodies.", name: 'bcti_7', labels: bcti_label, required: true}, 
       {prompt: "The US government allowed the 9/11 attacks to take place so that it would have an excuse to achieve foreign (e.g., wars in Afghanistan and Iraq) and domestic (e.g., attacks on civil liberties) goals that had been determined prior to the attacks.", name: 'bcti_8', labels: bcti_label, required: true}, 
       {prompt: "The assassination of John F. Kennedy was not committed by the lone gunman, Lee Harvey Oswald, but was rather a detailed, organised conspiracy to kill the President.", name: 'bcti_9', labels: bcti_label, required: true}, 
       {prompt: "In July 1947, the US military recovered the wreckage of an alien craft from Roswell, New Mexico, and covered up the fact.", name: 'bcti_10', labels: bcti_label, required: true}, 
       {prompt: "Princess Diana's death was not an accident, but rather an organised assassination by members of the British royal family who disliked her.", name: 'bcti_11', labels: bcti_label, required: true}, 
       {prompt: "The Oklahoma City bombers, Timothy McVeigh and Terry Nichols, did not act alone, but rather received assistance from neo-Nazi groups.", name: 'bcti_12', labels: bcti_label, required: true},
       {prompt: "The Coca Cola company intentionally changed to an inferior formula with the intent of driving up demand for their classic product, later reintroducing it for their financial gain.", name: 'bcti_13', labels: bcti_label, required: true},
       {prompt: "Special interest groups are suppressing, or have suppressed in the past, technologies that could provide energy at reduced cost or reduced pollution output.", name: 'bcti_14', labels: bcti_label, required: true},
       {prompt: "Government agencies in the UK are involved in the distribution of illegal drugs to ethnic minorities.", name: 'bcti_15', labels: bcti_label, required: true},
  ],
  required_error: "Please, answer all questions.",
  button_label: 'Continue'
};

var instruction_demographic_questionnary = {
  type: jsPsychHtmlButtonResponse,
  stimulus:
    "<p class='instructions_questionnary'>You are nearly at the end of this experiment, please answer this last set of questions about yourself.</p>",
    choices: ['Continue']
};
        
var gender = {
  type: jsPsychSurveyMultiChoice,
  questions: [
    {
      prompt: "<p class='instructions_questionnary'>What gender do you identify as?</p>", 
      options: ["Woman", "Man","Other"],
      name: 'genre',
      required: true,
      horizontal: true
    }
  ],
  required_error: "Please, answer all questions.",
  button_label: 'Continue'
};
          
var age = {
  type: jsPsychSurveyText,
  questions: [
    {
      prompt: "<p class='instructions_questionnary'>How old are you? (in year, just a number, for instance 32)</p>",
      placeholder: 'XX',
      name: 'age',
      required: true
    }
  ],
  required_error: "Please, answer all questions.",
  button_label: 'Continue'
};

var comment = {
  type: jsPsychSurveyText,
  questions: [
    {
      prompt: "<p class='instructions'>Do you have any comments about the study?</p>",
      name: 'comment',
      rows: 5
    }
  ],
  required_error: "Please, answer all questions.",
  button_label: 'Continue'
};

var waiting_demand = {
  type: jsPsychHtmlButtonResponse,
  stimulus:
  "<p class='instructions'>You have now finished answering all the questions. " +
  "After clicking <strong>continue</strong>, the data will be saved while loading. " +
  "<strong>Please wait until the next page appears to exit.</strong> " +
  "Otherwise, we will have no proof that you have completed the study and won't be able to pay you.</p>",
  choices: ['Continue']
};

//prolific ----------------------------------------------------------------------------------
var prolific = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: "<p class='instructions'>You have finished the last task. Thanks for participating!</p>"+
  "<p class='instructions'>Please wait a moment, you will automatically be redirected to prolific.</p>",
  trial_duration: 3000,
  choices: "NO_KEYS",
  on_finish: function(){
  window.location.href = "https://app.prolific.com/submissions/complete?cc=C1M3ZJTT";
  }
};

var prolific_id = jsPsych.data.getURLVariable('PROLIFIC_PID');
var study_id = jsPsych.data.getURLVariable('STUDY_ID');
var session_id = jsPsych.data.getURLVariable('SESSION_ID');

//Save data ---------------------------------------------------------------------------------
const subject_id = jsPsych.randomization.randomID(10);
const filename = `${subject_id}.csv`;
const experiment_id = "TFxuaxMkpyR3";

jsPsych.data.addProperties({
  subject_id: subject_id,
  prolific_id: prolific_id,
  study_id: study_id,
  session_id: session_id,
  button_randomization: button_randomization,
  order_randomization: order_randomization,
  stim_randomization: stim_randomization
})

var save_data = {
  type: jsPsychPipe,
  action: "save",
  experiment_id: experiment_id,
  filename: filename,
  data_string: ()=>jsPsych.data.get().csv()
}

//timeline
timeline.push 
  (browser_check,
  welcome,
  consent,
  consigne,
  procedure_testing,
  question,
  conditional_slider,
  attention_check,
  instruction_questionnary,
  cmq_questionnary,
  bcti_questionnary,
  instruction_demographic_questionnary,
  gender,
  age,
  comment,
  waiting_demand,
  save_data, 
  prolific 
)

jsPsych.run(timeline)