/*
  Schema for disease entries — use these exact field names for all entries:
  - title: string (required)
  - description: string (required)
  - causes: string | string[] (optional)
  - riskFactors: string | string[] (optional)
  - symptoms: string | string[] (optional)
  - diagnosis: string | string[] (optional)
  - management: string | string[] (optional)
  - prevention: string | string[] (optional)
  - complications: string | string[] (optional)
  - whenToConsultDoctor: string (optional) — renders as alert card if present
*/

export const diseaseDetailsData = {
  'abdominal-pain': {
    title: 'Abdominal Pain',

    description:
      'The region between the chest and pelvis is called abdomen, commonly known as belly. Pain in this region is defined as abdominal pain, also known as belly ache, tummy ache, or stomach ache. There are several types depending on the nature of pain — it can be mild or severe, acute or chronic, continuous or intermittent. It may be a sign of any infection, inflammation, or disorder of the abdominal organs.',

    causes: [
      'Constipation',
      'Diarrhea',
      'Gastro-esophageal reflux disease (GERD)',
      "Crohn's disease",
      'Gallstones',
      'Kidney stones',
      'Ovarian cysts',
      'Uterine fibroids',
      'Appendicitis',
      'Cancer',
    ],

    riskFactors: [
      'Advancing age',
      'Previous abdominal surgery',
      'History of any bowel disorder',
    ],

    symptoms: [
      'Diarrhea',
      'Gas and bloating',
      'Flatulence',
      'Constipation',
      'Nausea',
      'Vomiting',
      'Decreased appetite',
    ],

    diagnosis:
      'Detailed history is taken by asking questions about the nature and duration of pain. Physical examination of the abdomen is then performed. To identify the underlying cause, tests such as MRI, ultrasound, X-rays, colonoscopy, and endoscopy may be ordered.',

    management: [
      'OTC medicines: antacids, anti-nausea drugs, stool softeners, etc.',
      'Antibiotics for bacterial inflammation of the stomach.',
      'Home remedies: ginger tea for digestion, liquid diet, heat compress for cramps.',
      'Prescription painkillers under medical supervision when needed.',
    ],

    whenToConsultDoctor:
      'Consult your doctor immediately if the pain is so severe you cannot sit properly, or if you experience bloody stools, persistent vomiting, fever, abdominal swelling, or pain that has lasted more than 24 hours.',
  },

  'acne': {
    title: "Acne",

    description:
      "Acne vulgaris is a chronic skin disease caused by clogged hair follicles with oil and dead skin cells. It leads to pimples, blackheads, whiteheads, cysts, and nodules. It commonly affects teenagers and appears on the face, back, and trunk. It is not dangerous but may leave marks.",

    causes: [
      "Genetic (family history of acne)",
      "Increased androgen levels (puberty, menstruation, PCOS, pregnancy)",
      "Bacteria (Cutibacterium acnes)",
      "High glycemic diet and dairy products",
      "Stress (worsens condition but not a direct cause)",
    ],

    riskFactors: [
      "Puberty",
      "Family history of acne",
      "Pregnancy",
      "Use of oily lotions and creams",
    ],

    symptoms: [
      "Cysts",
      "Whiteheads (raised white bumps)",
      "Blackheads",
      "Nodules (large painful lumps)",
      "Papules (small red tender bumps)",
      "Pustules (pimples with pus)",
      "Scarring",
    ],

    diagnosis: [
      "Physical examination by dermatologist",
      "Patient medical history",
      "Hormone level blood tests (if required)",
    ],

    management: [
      "Gentle skincare (non-drying cleanser, avoid harsh scrubbing)",
      "Remove makeup before sleeping",
      "Low carbohydrate diet",
      "Benzoyl peroxide",
      "Antibiotics (Doxycycline, Minocycline, Tetracycline)",
      "Topical retinoids",
    ],

    whenToConsultDoctor:
      "Consult a doctor if acne worsens, leaves scars, or causes anxiety or depression.",
  },
  'acoustic-neuroma': {
  title: 'Acoustic Neuroma',

  description:
    'Acoustic Neuroma, also known as vestibular schwannoma, is a benign (local) tumor that develops on the auditory (cochlear) and hearing, and balance (vestibular) nerves. These nerves are involved in the hearing and balance functions of the body. The tumor may lead to hearing loss and/or imbalance.',

    causes: [
      'Mutation of a gene on chromosome 22 that codes for a tumor suppressor protein (may be genetic or due to external factors)',
      'Neurofibromatosis type 2 (rare genetic disorder)',
      'Excessive exposure to cellphones',
      'Parathyroid adenoma',
      'History of radiation therapy, especially on head and neck region',
      'Persistent listening of loud noises, particularly through headphones',
      'Diet',
    ],

    riskFactors: [
      'Family history',
      'Exposure to carcinogens and mutagens',
      'Frequent contact with radiation, such as X-rays',
    ],

    symptoms: [
      'Hearing loss, may be gradual or sudden occurring on one side or both',
      'Tinnitus (ringing in the ears)',
      'Unsteadiness and loss of balance',
      'Unsteady gait',
      'Dizziness',
      'Facial numbness',
      'Loss of muscle control (rare)',
    ],

    diagnosis: [
      'Gadolinium enhanced MRI (ideal diagnostic test)',
      'CT scan (if MRI is unavailable)',
      'Audiometry or hearing analysis — series of hearing tests to ensure hearing ability in both ears',
    ],

  management: [
    'Observation: monitoring signs and symptoms with regular imaging and follow-up over six to twelve months',
    'Surgery: surgical removal for tumors that have grown considerably (subject to age, size, and prognosis)',
    'Radiotherapy: recommended for small tumors or patients who cannot undergo surgery',
    'Supportive or palliative treatment: to manage symptoms such as dizziness and hearing difficulties',
    ],

  whenToConsultDoctor:
    'Early diagnosis can lead to effective and successful treatment. If your symptoms do not improve within a few days, or you experience any of the symptoms mentioned above, such as one-sided hearing loss or trouble keeping balance, please see a doctor.',
  },

  'advanced-prostate-cancer': {
    title: 'Advanced Prostate Cancer',

    description:
      'Advanced Prostate Cancer is defined as cancer of the prostate that has spread into the surrounding tissues/organs, such as the bones, liver, and lungs. It is a severe fatal condition that requires immediate medical attention; failure to do so may result in death.',

    causes: [
      'Cancer cells breaking away from the prostate and spreading to other organs such as bones and liver',
      'Genetic or family history',
      'Viruses causing severe prostate inflammation',
      'Long term use of certain medicines',
    ],

    riskFactors: [
      'Old age',
      'Viral infections',
      'Certain medicines',
      'African-American race',
      'High calcium intake',
      'Unhealthy lifestyle',
      'Frequent exposure to radiation',
    ],

    symptoms: [
      'Pain while urinating',
      'Blood in urine',
      'Fatigue',
      'Weight loss',
      'Symptoms associated with the organ the cancer cells have spread to',
    ],

    diagnosis: [
      'Blood tests: to check Prostate Specific Antigen (PSA) levels',
      'Digital Rectal Exam: physical check to assess changes in the prostate',
      'Computerized Tomography Scan (CT scan)',
      'Magnetic Resonance Imaging (MRI)',
      'Bone Scan',
      'Biopsy: examination of cancer affected specimen',
    ],

    management: [
      'Regular and directed use of prescribed medicines',
      'Lifestyle changes',
      'Radiation therapy',
    ],

    whenToConsultDoctor:
      'Early diagnosis can lead to effective and successful treatment. If you experience any of the symptoms mentioned above, such as pain in urination and prostate changes, please see a doctor.',
  },
  'allergic-rhinitis': {
    title: 'Allergic Rhinitis',

    description:
      'Allergic rhinitis is an allergic reaction causing irritation and inflammation of the mucous membrane inside the nose. It occurs on inhalation of allergens present in air such as pollen, dust, animal dander, and fungal spores, or on consumption of food items or medicines that a person is allergic to.',

    causes: [
      'Breathing in airborne allergens such as dust mites, animal skin, saliva, pollen, and spores',
      'Allergens present in the work environment such as wood dust, flour dust, or latex',
      'Eating food items that a person is allergic to such as mushrooms, cheese, or chocolate',
    ],

    riskFactors: [
      'Pre-existing asthma (swelling and narrowing of airways)',
      'Eczema (red and itchy skin)',
      'History of common cold',
      'Early exposure to allergen-rich environments (e.g., growing up in a household where everyone smokes)',
    ],

    symptoms: [
      'Runny and stuffy nose',
      'Sneezing',
      'Rhinorrhea (excess nasal secretion)',
      'Itching',
      'Swelling and redness of conjunctiva',
      'Teary eyes',
      'Itching in the throat',
    ],

    diagnosis:
      'Your physician will ask about your symptoms, medical history, and family medical history. They will also gather information about triggers such as the time of year, season, time of day, food items, or medicines that aggravate your allergic rhinitis.',

    management: [
      'Avoid places and environments that trigger your allergies',
      'Use a face mask when going out during allergy-prone seasons',
      'Use a nasal spray if symptoms persist for longer than a week',
      'Antihistamines (if first-line treatment fails)',
      'Nasal decongestants',
      'Cromolyn',
      'Intranasal corticosteroids',
    ],

    whenToConsultDoctor:
      'Consult a doctor if your symptoms persist or worsen, if you start experiencing new symptoms after taking medicines, or if you have a general feeling of illness and discomfort.',
  },

  'allergy': {
    title: 'Allergy',

    description:
      'An allergy is an amplified reaction of the immune system to ordinary substances that are typically not harmful. The immune system becomes hypersensitive to otherwise harmless substances. The most common types include food allergy and pollen allergy.',

    causes: [
      'Airborne allergens such as pollen, animal dander, and dust mites',
      'Certain food items such as mushroom, peanut, soy, eggs, and milk',
      'Insect stings',
      'Medicines such as penicillin',
      'Latex',
      'Stress',
      'Environmental factors',
    ],

    riskFactors: [
      'Family history of allergy or allergic diseases like asthma',
      'Pre-existing asthma',
      'Young age (children are more prone to developing allergies)',
      'Prolonged exposure to allergens',
      'Growing up in a household where everyone smokes',
      'Living in a heavily polluted environment',
      'Working in an environment with increased chemical toxin exposure',
    ],

    symptoms: [
      'Sneezing',
      'Itchy and runny nose',
      'Red and teary eyes',
      'Tingling in the mouth',
      'Scratchy throat',
      'Swelling at the sting site',
      'Rash (change in color and texture of skin)',
      'Itchy skin',
      'Cough and wheezing (whistling sounds on breathing)',
    ],

    diagnosis:
      'Your doctor will take a thorough medical and family history, ask about your symptoms, and may perform allergy tests to identify the cause of your allergy.',

    management: [
      'Avoid all factors that trigger your allergy',
      'Antihistamine medicines to reduce symptoms',
      'Decongestants for a blocked or stuffy nose',
      'Steroids in case of serious inflammation caused by an allergic reaction',
    ],

    whenToConsultDoctor:
      'Consult a doctor if your condition worsens, anti-allergy medicines fail to provide relief, or if you experience new symptoms after starting a new medicine.',
  },

  'alopecia': {
    title: 'Alopecia',

    description:
      'Alopecia is an autoimmune condition that causes hair to fall out in small patches, usually unnoticeable at first. It develops when the immune system attacks the hair follicles, resulting in hair loss on the scalp, eyelashes, eyebrows, face, and other parts of the body. Alopecia usually develops slowly and may reoccur after years.',

    causes:
      'Alopecia is an autoimmune condition in which the immune system mistakenly attacks healthy hair follicles. The follicles become smaller, stop producing hair, and eventually lead to hair loss. The exact cause is unknown, but it often occurs in people with a family history of autoimmune conditions like Type 1 Diabetes or rheumatoid arthritis.',

    riskFactors: [
      'Family history of balding',
      'Recent or current pregnancy',
      'Certain medical conditions such as diabetes or lupus',
      'Poor nutrition',
    ],

    symptoms: [
      'Patchy hair loss (clumps noticed in the shower or on a pillow)',
      'Hair loss on the scalp, facial hair, chest, and back (more common in men)',
    ],

    diagnosis: [
      'Physical examination of the extent of hair loss and hair samples',
      'Scalp biopsy',
      'Blood tests: thyroid hormones, iron levels, C-reactive protein, free and total testosterone',
    ],

    management: [
      'Corticosteroids prescribed by a doctor',
      'Topical immunotherapy',
    ],

    whenToConsultDoctor:
      'Consult your doctor when you notice unexpected patches of hair loss.',
  },

  'alzheimers-disease': {
    title: "Alzheimer's Disease",

    description:
      "Alzheimer's disease is a progressive neurological disorder characterized by memory loss and cognitive deterioration due to the death of brain cells. It worsens gradually over time and is classified into seven stages: Stage 1 (no symptoms), Stage 2 (early forgetfulness), Stage 3 (mild impairments), Stage 4 (memory loss and inability to perform tasks — most commonly diagnosed at this stage), Stage 5 (moderate to severe symptoms), Stage 6 (requires help with basic activities such as eating), and Stage 7 (severe stage with possible loss of speech and facial expressions).",

    causes:
      "Alzheimer's disease is caused when harmful protein fragments join together to form clumps inside and outside brain cells, disrupting signaling between them and eventually leading to brain cell death.",

    riskFactors: [
      'Genetic causes (Down\'s syndrome, gene mutation of Psen1 or Psen2)',
      'Advanced age (people above 80 are most commonly affected)',
      'Family history of Alzheimer\'s disease',
      'History of head injury',
      'Pre-existing conditions such as diabetes, heart disease, or high blood pressure',
    ],

    symptoms: [
      'Short term memory loss',
      'Sleeping issues',
      'Difficulty in communicating',
      'Confusion',
      'Drastic mood changes',
      'Long term memory loss',
      'Paranoia and hallucinations',
    ],

    diagnosis: [
      'Detailed medical history including previous injuries and family history',
      'Blood tests, urine tests, and other medical tests to evaluate conditions like diabetes and high blood pressure',
      'Brain scans (CT scan and MRI) for definitive diagnosis',
    ],

    management: [
      'No cure currently exists for Alzheimer\'s disease',
      'Medications to slow symptom progression: Fluoxetine, Lorazepam, Aripiprazole, Sertraline',
      'Vaccine therapy (in development): trains the immune system to attack harmful protein fragments before they form clumps',
    ],

    whenToConsultDoctor:
      'If forgetfulness develops slowly without affecting daily life, it may be a normal aging process. However, if memory loss occurs suddenly, causes sleep disturbances, wandering, or difficulty remembering basic things — increasing the risk of self-harm — consult a doctor right away.',
  },

  'alzheimers-disease': {
    title: "Alzheimer's Disease",

    description:
      "Alzheimer's disease is a progressive neurological disorder characterized by memory loss and cognitive deterioration due to the death of brain cells. It worsens gradually over time and is classified into seven stages: Stage 1 (no symptoms), Stage 2 (early forgetfulness), Stage 3 (mild impairments), Stage 4 (memory loss and inability to perform tasks — most commonly diagnosed at this stage), Stage 5 (moderate to severe symptoms), Stage 6 (requires help with basic activities such as eating), and Stage 7 (severe stage with possible loss of speech and facial expressions).",

    causes:
      "Alzheimer's disease is caused when harmful protein fragments join together to form clumps inside and outside brain cells, disrupting signaling between them and eventually leading to brain cell death.",

    riskFactors: [
      'Genetic causes (Down\'s syndrome, gene mutation of Psen1 or Psen2)',
      'Advanced age (people above 80 are most commonly affected)',
      'Family history of Alzheimer\'s disease',
      'History of head injury',
      'Pre-existing conditions such as diabetes, heart disease, or high blood pressure',
    ],

    symptoms: [
      'Short term memory loss',
      'Sleeping issues',
      'Difficulty in communicating',
      'Confusion',
      'Drastic mood changes',
      'Long term memory loss',
      'Paranoia and hallucinations',
    ],

    diagnosis: [
      'Detailed medical history including previous injuries and family history',
      'Blood tests, urine tests, and other medical tests to evaluate conditions like diabetes and high blood pressure',
      'Brain scans (CT scan and MRI) for definitive diagnosis',
    ],

    management: [
      'No cure currently exists for Alzheimer\'s disease',
      'Medications to slow symptom progression: Fluoxetine, Lorazepam, Aripiprazole, Sertraline',
      'Vaccine therapy (in development): trains the immune system to attack harmful protein fragments before they form clumps',
    ],

    whenToConsultDoctor:
      'If forgetfulness develops slowly without affecting daily life, it may be a normal aging process. However, if memory loss occurs suddenly, causes sleep disturbances, wandering, or difficulty remembering basic things — increasing the risk of self-harm — consult a doctor right away.',
  },

  'amoebiasis': {
    title: "Amoebiasis",

    description:
      "Parasites are tiny microscopic creatures that take nourishment (food and energy) from their host. One such parasite called Entamoeba histolytica causes infection of the intestines which is called Amoebiasis.",

    causes:
      "Amoebiasis occurs when E.Histolytica is ingested through contaminated food and water that might have been exposed to fecal contamination. It is most common in tropical areas of the world where sanitation is poor.",

    riskFactors: [
      'Pregnant woman',
      'Use of contaminated medical devices during colon surgery',
      'Malnourished people',
      'Drinking contaminated water',
      'Living in a poor sanitation area',
      'Eating contaminated food',
      'Hands of the food handler are contaminated',
      'Transmission person to person through oral or fecal route',
    ],

    symptoms: [
      'Vomiting',
      'Diarrhea',
      'Bloody stools (in extreme infection)',
      'Abdominal pain',
      'High temperature',
      'Nausea',
      'Loss of appetite leading to sudden weight loss',
      'Losing a lot of liquid',
      'Rectal pain during a bowel movement',
      'Fatigue',
      'Intestinal gas',
    ],

    diagnosis: [
      'Blood, urine, and stool tests when an amoebiasis cyst is suspected due to health history or recent travel history',
      'LFT (liver function test), ultrasounds, and CT scans for getting a visual of the parasite present',
      'Colonoscopy may also be advised to search for the parasite',
    ],

    management: [
      'Anti-parasitic drugs like Paramomycin, Iodoquinol, Diloxanide furoate are prescribed in case of a mild infection',
      'Flagyl (Metronidazole) along with broad spectrum antibiotics may be prescribed if the infection is severe and causing damage to the intestine or liver',
      'Prevention tips: Wash hands with soap and water after using the bathroom and before handling food',
      'Prevention tips: Wash fruits and vegetables before eating, and stick to bottled water (or boil/treat it with iodine)',
      'Prevention tips: Avoid food sold by street vendors, and avoid milk, cheese, or other un-pasteurized dairy products if you already have amoebiasis',
    ],

    whenToConsultDoctor:
      'One should consult a doctor right away in case of extreme pain with frequent vomiting and blood in the stool. A doctor will perform tests and give the needed medical care.',
  },

  'anemia': {
    title: "Anemia",

    description:
      "Anemia is a condition characterized by lack of red blood cells. The function of these red blood cells is to carry and supply oxygen throughout the body, therefore, a lack of healthy red blood cells results in inadequate circulation of oxygen throughout the body. Anemia can be temporary or long term and it can be mild or severe.",

    causes:
      "Known causes of anemia include insufficient production of erythropoietin (a hormone required for production of red blood cells), deficiency of folate, vitamin B12, or iron, hypothyroidism (lack of thyroid hormones), accidents, gastrointestinal lesions, menstruation, childbirth, surgery, cirrhosis, hemolysis (breakdown of red blood cells), disorders of liver and spleen, G6PD deficiency (genetic disorder), and thalassemia (abnormal hemoglobin structure).",

    riskFactors: [
      'A diet lacking iron, folate, and vitamin B12',
      'Intestinal disorders',
      'Heavy menstruation',
      'Pregnancy',
      'Chronic diseases',
      'Family history',
      'Age',
      'Blood diseases',
      'Autoimmune disorders',
    ],

    symptoms: [
      'Fatigue and weakness',
      'Pale skin',
      'Irregular heartbeat',
      'Shortness of breath',
      'Dizziness and headache',
      'Chest pain',
      'Cold hands and feet',
      'Growth problems in children',
      'Unusual cravings for ice, clay, or dirt',
      'Brittle nails',
      'Constipation',
      'Enlarged spleen',
    ],

    diagnosis: [
      'Detailed medical, menstrual, and family history',
      'Questions regarding your diet, racial origin, and religion since these are good predictors of the type of diet a person takes',
      'Laboratory investigations like CBC, serum iron levels, vitamin B12 test, folic acid test, and stool test',
    ],

    management: [
      'Iron supplements may be used for iron deficiency',
      'Vitamin B supplements may be used for low vitamin level',
      'Blood transfusions may be used for blood loss',
      'Medications may be used to induce production of red blood cells if the body\'s blood production is reduced',
    ],

    whenToConsultDoctor:
      'A doctor should be consulted if one suspects signs and symptoms of anemia like feeling tired all the time (even after having proper sleep), if the medication prescribed by the doctor is causing any side effects, or if the medicines prescribed are not effective in managing the symptoms.',
  },

  'angina': {
    title: "Angina",

    description:
      "Angina, also known as Angina Pectoris, is a condition characterized by chest pain and severe discomfort due to reduced blood flow to the heart. It is frequently described as heaviness, tightness, and a squeezing feeling in the chest. It may be a symptom of coronary artery disease. Types include Stable Angina (triggered by physical activity or stress), Unstable Angina (due to vessel rupture/clot, does not respond to rest), and Prinzmetal’s Angina (temporary spasms frequently occurring at rest).",

    causes:
      "Angina primarily occurs because of reduced blood flow to the heart muscle, leading to an inadequate supply of oxygen and other essential nutrients. Other causes include Coronary Artery Disease, excessive physical activity, fatty deposits in the vessel which cause occlusion, blood vessel rupture, or temporary spasms of the coronary artery.",

    riskFactors: [
      'Lack of physical activity',
      'Unhealthy eating habits',
      'Overweight or obesity',
      'Smoking',
      'High cholesterol levels',
      'Diabetes',
      'Old age',
      'Male gender',
      'Family history',
      'Post-menopause in women',
      'Severe mental illness',
      'Certain medications',
    ],

    symptoms: [
      'Chest pain',
      'Feeling of fullness',
      'Peripheral pain (pain in extremities, such as hands and feet)',
      'Dizziness',
      'Fatigue',
      'Shortness of breath or breathing difficulties',
      'Sweating',
    ],

    diagnosis: [
      'Physical examination and check of relevant symptoms',
      'Blood tests and Electrocardiogram (ECG)',
      'Chest X-ray and Computerized Tomography Scan (CT scan)',
      'Coronary CT angiography and Magnetic Resonance Imaging (MRI)',
      'Coronary angiography and echocardiogram (heart test using ultrasound waves)',
    ],

    management: [
      'Regular and directed use of prescribed medicines',
      'Lifestyle changes',
      'Angioplasty (not for all patients)',
      'Stenting (medical procedure)',
      'Coronary bypass surgery',
    ],

    whenToConsultDoctor:
      'Early diagnosis can lead to effective and successful treatment. If your symptoms do not improve within 10 days, or you experience any of the symptoms mentioned, such as breathlessness or sudden onset of severe pain, please see a doctor.',
  },

  'aphthous-ulcer': {
    title: "Aphthous Ulcer",

    description:
      "Apthous ulcers are lesions that develop on the mucous membranes and soft tissues inside your mouth. These lesions are usually round in shape, occur on soft areas of your oral cavity, and are non-contagious, benign, and may or may not be painful. In the majority of affected people, the condition is recurrent, lasting around 7-10 days per outbreak. There are three types: major, minor, and herpetiform ulcers.",

    causes:
      "Common causes include emotional distress, minor trauma, genetics, excessive spicy food or hot drink intake, vitamin/mineral deficiencies, bacterial contamination of the oral cavity, use of tobacco products, hormonal imbalance associated with pregnancy, or a weakened immune system.",

    riskFactors: [
      'Injury to mouth (usually from dental work)',
      'Aggressive brushing of teeth',
      'Deficiency in Vitamin B12, zinc, and folate',
      'Infection caused by bacteria, e.g. Helicobacter pylori',
      'Emotional stress',
      'Allergies to certain foods such as nuts and chocolates',
      'Long-term diseases such as Celiac disease, Crohn\'s disease, and ulcerative colitis',
    ],

    symptoms: [
      'Burning or itching sensation inside mouth',
      'Tenderness (pain) in mucosal areas of oral cavity',
      'Shallow and pale lesions',
      'Difficulty in eating, drinking, and speaking',
      'Lesions become red in color when they are inflamed',
      'Pyrexia (fever) in rare cases',
    ],

    diagnosis: [
      'Medical examinations and a detailed medical history',
      'Evaluation based on the affected person’s condition, severity, duration, and presence of other symptoms',
      'Blood tests and liver function tests to rule out serious systemic diseases',
    ],

    management: [
      'Avoiding hard or irritative food items',
      'Applying cold substances to the affected area',
      'Using numbing preparations when the pain becomes unbearable',
      'Topical anti-inflammatory ointments applied 2-4 times a day',
      'Chlorhexidine mouthwash and practicing good oral hygiene',
    ],

    whenToConsultDoctor:
      'You should pay a visit to your doctor or dentist in case of large, persistent ulcers, recurring ulcers, uncontrollable pain, or difficulty in eating and drinking.',
  },

  'aplastic-anemia': {
    title: "Aplastic Anemia",

    description:
      "Aplastic Anemia is characterized by a significantly low blood cell count, leading to increased susceptibility to infections and persistent fatigue. It can occur at any age, with intensity ranging from mild to severe. It may be managed with medications or require a bone marrow transplant.",

    causes:
      "Aplastic anemia occurs when the function of the bone marrow is impaired, producing either a reduced number of blood cells (Hypo-plastic) or no blood cells at all (Aplastic). This can be caused by radiation/chemotherapy, certain medicines, toxic chemical/mutagenic agent exposure, autoimmune disorders, viral infections, pregnancy, or unknown factors.",

    riskFactors: [
      'Frequent exposure to radiation or chemotherapy, e.g. in cancer',
      'Usage of certain medication such as chloramphenicol',
      'Certain autoimmune disorders',
      'Pregnancy',
      'Occupational professions with frequent radiation exposure',
    ],

    symptoms: [
      'Shortness of breath and pale skin',
      'Fatigue and weight loss',
      'Irregular heartbeat',
      'Easy or unexplained bruising and prolonged bleeding',
      'Impaired wound healing',
      'Skin rash',
      'Dizziness and headache',
      'Fever',
    ],

    diagnosis: [
      'Physical examination checking for symptoms like pale skin and breathlessness',
      'General investigations: CBC, LFT, renal function, electrolytes, thyroid function, Vitamin B12, and folic acid levels',
      'Bone marrow biopsy (the most useful investigation to differentiate aplastic anemia from other conditions)',
      'Blood tests to exclude paroxysmal nocturnal hemoglobinuria',
      'X-ray, CT scan, Ultrasound, antibody analysis, and viral analysis',
    ],

    management: [
      'Regular use of prescribed medicines',
      'Iron supplementation',
      'Folic acid supplementation',
      'Blood transfusions',
    ],

    whenToConsultDoctor:
      'Early diagnosis can lead to effective and successful treatment. If your symptoms do not improve within a few days, or you experience any of the symptoms mentioned above, please see a doctor.',
  },

  'arrythmias': {
    title: "Arrythmias",

    description:
      "Arrhythmia is a disturbance in impulse formation or conduction originating from the heart’s pacemaker (sinus node). The heart may beat very fast (tachycardia), very slow (bradycardia), very early (premature contraction), or irregularly (fibrillation). Types include Atrial fibrillation, Atrial flutter, Supraventricular tachycardia, Ventricular fibrillation, and Long QT syndrome.",

    causes:
      "Irregular heartbeats can result from congenital heart disease, imbalance of electrolytes (such as sodium or potassium) in the blood, injury after a heart attack, changes in the muscles of the heart, heart disease/coronary artery disease, stress, and smoking.",

    riskFactors: [
      'Heart diseases like Coronary artery disease, heart attack, heart failure, and cardiomyopathy',
      'Advancing age',
      'Pre-existing conditions like diabetes, hypertension, and sleep apnea',
      'Drug abuse',
      'Obesity',
      'Thyroid problems',
    ],

    symptoms: [
      'Skipped heartbeat or pounding heart',
      'Breathing difficulties',
      'Fainting',
      'Dizziness (lightheadedness)',
      'Blurred vision',
      'Sweating',
      'Chest pain',
    ],

    diagnosis: [
      'History taking and physical examination',
      'ECG (electrocardiogram) to check electrical activity',
      'Holter monitor (measures electrical activity over 1 to 2 days) and event monitors',
      'Stress test to measure tolerance during exercise',
      'Echocardiograms, cardiac catheterization, electrophysiology study, and head-up tilt table test',
    ],

    management: [
      'Medications: Adenosine, Atropine, Calcium channel blockers, Beta blockers, Sodium channel blockers, Digoxin, Potassium channel blockers',
      'Implanting devices: Artificial pacemakers and cardioverter-defibrillators',
      'Cardioversion (electric shocks to restore normal rhythm)',
      'Vagal maneuvers (special exercises to control heart rhythm)',
      'Ablation therapy (catheters used to block the pathway causing arrhythmia)',
    ],

    whenToConsultDoctor:
      'A doctor should be consulted if the prescribed treatment is no longer effective. If you experience a sudden shortness of breath, lightheadedness, chest pain, or an irregular heartbeat, you should go to a hospital immediately.',
  },

  'arthralgia': {
    title: "Arthralgia",

    description:
      "Arthralgia is mild to severe pain that arises from any joint, affecting the mobility of the patient. The pain may be sharp, dull, stabbing, burning, or throbbing, and can be aggravated by mobility and pressure on the joints. It may be limited to a single joint or affect multiple joints.",

    causes:
      "Causes of arthralgia include arthritis (inflammation of joints), SLE (Systemic lupus erythematosus), rheumatic fever, infections (like Haemophilus, influenza, measles, and mumps), bone dislocations, broken/fractured bones, overuse of joints, rupture of tendons, osteomyelitis, and bursitis.",

    riskFactors: [
      'Advanced age',
      'Long-term strain on joints',
      'Increased weight',
      'Previous joint surgery',
      'Previous joint injuries',
    ],

    symptoms: [
      'Tenderness, burning, and itching',
      'Swelling and redness',
      'Numbness or tingling',
      'Fever and fatigue',
      'Joint stiffness',
    ],

    diagnosis: [
      'Complete medical history followed by a physical examination focusing on joint inspection and special maneuvers',
      'Joint fluid analysis',
      'Blood tests for autoantibodies, complete blood picture, or C-reactive protein',
      'Imaging including X-rays, ultrasounds, or MRI',
    ],

    management: [
      'Homecare: Taking hot showers, stretching, and icing to reduce pain and swelling',
      'Medicines: Acetaminophen (mild), NSAIDs (moderate with swelling), or Opioids (severe)',
      'Physiotherapy to increase mobility and function of the joints',
      'Surgery: Joint replacement therapy for severely damaged joints',
    ],

    whenToConsultDoctor:
      'Seek immediate help if you have a fever associated with arthralgia, unexplained arthralgia, unexplained bleeding, severe weight loss, compromised mobility, or worsening of the condition.',
  },
  'arthritis': {
    title: "Arthritis",

    description:
      "Arthritis is an inflammatory disease of the joints. The most common types are Osteoarthritis (a degenerative disease due to wear and tear of cartilage) and Rheumatoid arthritis (an autoimmune disease where the immune system attacks the joint lining, causing inflammation and swelling). Other types include Gout, pseudogout, psoriatic arthritis, and lupus.",

    causes:
      "Causes depend on the type: Osteoarthritis may develop from joint injury, familial tendency, or being overweight. Rheumatoid arthritis is autoimmune, occurring when an overactive immune system damages healthy tissue. Gout occurs from too much uric acid in the blood forming crystals in the joints. Pseudogout is caused by an excess of calcium pyrophosphate crystals.",

    riskFactors: [
      'Age (especially for osteoarthritis, which is age-related)',
      'Gender (Women are more likely to develop arthritis; however, gout is more common in men)',
      'Being overweight or obese (adds extra load on weight-bearing joints like knees and hips)',
      'Joint injuries (previous injuries from accidents increase osteoarthritis risk)',
    ],

    symptoms: [
      'Joint pain',
      'Stiffness (especially early in the morning)',
      'Restricted movement',
      'Joint swelling',
      'Redness around the skin of the joint',
      'Extreme pain in the big toe (classic sign of gout)',
    ],

    diagnosis: [
      'Physical examination',
      'Blood tests to detect antibodies',
      'Imaging tests such as X-Rays, MRIs, ultrasound, and CT Scans to view bone and cartilage',
    ],

    management: [
      'Patient education',
      'Physical therapy',
      'Weight loss',
      'Medications: Analgesics, NSAIDs, Counterirritants, DMARDs, and Corticosteroids',
      'Surgery for joint replacement',
    ],

    whenToConsultDoctor:
      'Consult a doctor if prescribed medication and exercise regimes do not relieve symptoms. Seek immediate help if you experience complications of rheumatoid arthritis such as trouble breathing (lung inflammation), chest pain (heart inflammation), eye pain/redness/light sensitivity, anemia, or rheumatoid nodules (lumps beneath the skin of involved joints).',
  },

  'asthma': {
    title: "Asthma",

    description:
      "Asthma (or bronchial asthma) is a chronic disease of the lungs characterized by inflammation of the airway, increased mucus production, and contraction of smooth muscles of the airway (bronchospasm). The airways of asthmatic patients become very sensitive and overreact to allergens, obstructing the passage of air and causing breathing difficulty.",

    causes:
      "Asthma is caused by certain triggers, which include allergens (pollen, dust, animal fur, spores, dust mites), infections (common cold, flu, viral/bacterial infections), physical activity or strenuous exercise, cold air, smoke and sharp smells, stressful situations, GERD, and certain drugs (Beta-Blockers, Aspirin, NSAIDs, ACE inhibitors).",

    riskFactors: [
      'Family history of asthma',
      'Smoking',
      'Smoking during pregnancy',
      'Obesity',
      'Exposure to pollution',
      'Existing allergic conditions',
    ],

    symptoms: [
      'Wheezing (a characteristic whistling sound heard on breathing)',
      'Loss of breath, even with little activity',
      'Coughing that worsens early in the morning and at night (may cause trouble sleeping)',
      'Coughing with sputum (may be the only sign present in the elderly)',
    ],

    diagnosis: [
      'Medical and family history, along with a physical exam checking the nose, throat, and chest for abnormal sounds',
      'Allergy tests to identify triggers',
      'Spirometry (measures ability to inhale/exhale)',
      'Challenge test (measuring lung function after inducing a trigger medicine)',
      'Peak flow meter tests (measures how well lungs expel air)',
      'Exhaled nitric oxide test (measures airway inflammation)',
      'Chest X-Ray to rule out foreign objects',
    ],

    management: [
      'Identifying and avoiding allergy triggers (staying indoors during high pollen, ensuring clean bedding/carpets, avoiding smoke and pets)',
      'Short-term relief medications: short-acting beta receptor agonists (salbutamol) and anticholinergic medicines (ipratropium)',
      'Long-term treatment medications: corticosteroids, long-acting beta adrenoreceptor agonists (salmeterol), leukotriene receptor antagonists, or theophylline',
    ],

    whenToConsultDoctor:
      'Consult a doctor if prescribed medications do not relieve symptoms. Seek immediate medical attention if you experience persistent coughing, blue face or lips, sweating, severe breathlessness, or chest pain, as asthma can be life-threatening in severe cases.',
  },

  'asthma-prevention': {
    title: "Asthma Prevention",

    description:
      "Asthma is a disease that results in inflammation and subsequent narrowing of the airways (bronchial tubes). This obstructs the passage of air, causing difficulty in breathing.",

    causes:
      "In asthmatic patients, an asthma attack may be triggered by pollen, animal fur, cold air, strenuous exercise, viral or bacterial infections, dust mites, smoke, and drugs such as Beta-Blockers, Aspirin, NSAIDS, or ACE inhibitors.",

    riskFactors: [
      'Family history of asthma',
      'Obesity',
      'Smoking',
    ],

    symptoms: [
      'Wheezing (a whistling sound heard on breathing)',
      'Loss of breath, even with little activity',
      'Coughing that tends to get worse early in the morning and at night (causing trouble sleeping)',
      'Coughing with sputum (may be the only sign present in the elderly)',
    ],

    diagnosis: [
      'Family history, medical history, and clinical examination',
      'Allergy tests to identify the cause of the allergy',
      'Spirometry and Peak Flow tests to measure breathing ability',
      'Chest X-Ray to rule out foreign objects causing symptoms',
    ],

    management: [
      'Identify and avoid triggers (prevent exposure to pollen by staying indoors, keeping clothes pollen-free)',
      'Avoid smoking and exposure to smoke',
      'Ensure bedding and carpets are clean',
      'Avoid exposure to pets if they trigger attacks',
      'Short-term relief medications: short-acting beta receptor agonists (salbutamol) and anticholinergics (ipratropium)',
      'Long-term medications: corticosteroids, long-acting beta adrenoreceptor agonists, leukotriene receptor antagonists, or theophylline',
    ],

    whenToConsultDoctor:
      'Consult a doctor if medications are not relieving symptoms. Seek immediate help for persistent coughing, blue face/lips, sweating, severe breathlessness, or chest pain.',
  },

  'bacterial-infections': {
    title: "Bacterial Infections",

    description:
      "Infections are diseases caused by the invasion of microorganisms like bacteria, viruses, fungi, and parasites. Increased load of pathogenic bacteria in the body can lead to a bacterial infection. Common examples include Tuberculosis, Pneumonia, Urinary tract infections, Food poisoning, Whooping cough, Meningitis, and Ear infections.",

    causes:
      "Bacterial infections are caused by toxins produced by bacteria entering your body. Bacteria can enter through contaminated food, contaminated water, breaks in the skin (wounds), or natural body openings (mouth and nose).",

    riskFactors: [
      'Weak immune system',
      'Malnutrition',
      'Pre-existing diseases',
      'Poor health and sanitation conditions',
      'Invasive medical procedures',
      'Increased age',
    ],

    symptoms: [
      'High body temperature',
      'Headache',
      'Cough',
      'Chills',
      'Breathing problems',
      'Fatigue',
    ],

    diagnosis: [
      'Complete medical history and simple physical exam',
      'Urine culture',
      'Throat and skin swab tests',
      'Skin biopsy',
      'Pus culture test',
      'Blood tests',
    ],

    management: [
      'Medications: Antibiotics to kill/stop bacteria growth, Pain relievers, and Anti-inflammatories',
      'Surgery: Surgical procedures are indicated to remove abscesses formed from bacterial infection',
    ],

    whenToConsultDoctor:
      'Consult a doctor if prescribed medication is ineffective or if you experience side effects from antibiotics. Seek immediate help if you experience allergy symptoms (rash, trouble breathing, swelling of face or tongue) within an hour of taking an antibiotic.',
  },

  'benign-prostatic-hyperplasia': {
    title: "Benign Prostatic Hyperplasia",

    description:
      "Benign prostatic hyperplasia (BPH), also known as benign prostatic hypertrophy, is the most common non-cancerous urologic disease in men, frequently occurring over age 50. The prostate gland enlarges as a normal part of aging, putting pressure on the urethra (which carries urine) and disturbing urine flow.",

    causes:
      "BPH is caused by hormonal changes (decreased testosterone and increased estrogen/dihydrotestosterone triggering prostate growth) and dietary factors (high protein diets increase the risk).",

    riskFactors: [
      'Old age (very common in patients older than 50)',
      'Family history (having a father or brother with the condition)',
      'Diabetes',
      'Increased weight (obesity)',
      'Erectile dysfunction',
    ],

    symptoms: [
      'Urinary frequency and urgency',
      'Increased frequency of urination at night',
      'Decreased flow of urine',
      'Hematuria (blood in urine)',
      'Dribbling of urine at the end of stream',
    ],

    diagnosis: [
      'Medical history, physical examination, and digital rectal exam to estimate prostate size',
      'Blood tests to measure PSA (prostate specific antigen) and check kidney function',
      'Urine tests to rule out other diseases',
      'Further testing via ultrasound, urine flow tests, or biopsy if required',
    ],

    management: [
      'Medicines: Alpha-blockers to relax prostate muscles, and 5-Alpha reductase inhibitors to reduce dihydrotestosterone',
      'Minimal invasive procedures: Transurethral resection/incision of the prostate, Transurethral needle ablation, Laser prostatectomy, or Photovaporization',
      'Invasive Procedures: Transurethral resection/incision of the prostate or Simple prostatectomy (removing inner part by opening abdomen)',
    ],

    whenToConsultDoctor:
      'Consult a doctor if there is persistence or worsening of the condition, or if you experience urinary retention, kidney/urinary stones, a sudden inability to urinate, or hematuria.',
  },
  'bipolar-disorder': {
    title: "Bipolar Disorder",

    description:
      "Bipolar disorder is a brain disorder characterized by depression, periods of lowered mood, as well as mania, periods of heightened mood. Those with bipolar disorder tend to experience these moods much stronger than the average person, making their outrageous behavior very noticeable to the outside world.",

    causes:
      "Bipolar disorder occurs due to a chemical imbalance in the brain. Why it happens is still under research.",

    riskFactors: [
      'Hereditary (if your siblings or parents have bipolar disorder, it increases your chance of having bipolar disorder by 10 percent)',
      'Certain drugs and medications can trigger maniac episodes e.g. selective serotonin reuptake inhibitors (SSRIs)',
      'Traumatic event',
    ],

    symptoms: [
      'Hopeless and discouraged',
      'Lack of energy',
      'Unable to focus',
      'Loss of appetite',
      'Sleeping too much',
      'Fatigue',
      'Thoughts of suicide',
      'Energetic',
      'Overly happy',
      'Talking fast and erratic',
      'Euphoric',
      'High self-esteem',
      'Delusions',
    ],

    diagnosis: [
      'Physical exam and psychiatric assessment',
      'Lab tests to identify any other conditions that could be causing the symptoms',
    ],

    management: [
      'LITHIUM SALTS (Lithium acts as a mood stabilizer)',
      'Medications like anti-depressant drugs, antipsychotics, anticonvulsants, benzodiazepines',
      'Psychological intervention may also be required e.g. talk therapy with a psychiatrist',
      'Maintaining enough sleep',
      'Cutting out alcohol and caffeine',
    ],

    whenToConsultDoctor:
      "Consult a psychiatrist if you experience mood swings often in yourself or a loved one. A doctor should be consulted if the medication prescribed is not helping in managing the symptoms. If a person suffering from bipolar disorder starts to have suicidal thoughts and behavior then medical assistance should be called right away.",
  },

  'bladder-spasms': {
    title: "Bladder Spasms",

    description:
      "Bladder Spasm, or ‘Detrusor Contraction,’ is an abnormal condition characterized by sudden and urgent need to urinate due to strong contraction of the bladder muscle, detrusor. Bladder Spasm may cause leakage of urine from the urethra; this is known as urinary incontinence or overactive bladder.",

    causes:
      "Causes include nerve dysfunction or damage, loss of the nervous control system, certain medicines, certain infections, surgery involving the bladder or the surrounding structures, trauma or surgery affecting bladder control, Interstitial Cystitis (bladder infection), and frequent catheter usage.",

    riskFactors: [
      'Usage of certain medicines',
      'A weak immune system increasing an individual\'s susceptibility to bladder infections',
      'Surgery involving the bladder or surrounding structures',
      'Certain nerve diseases',
      'Tumors in the brain',
      'Certain medical conditions, such as diabetes',
      'Spinal cord injury',
      'Pregnancy',
      'Elderly and menopausal women',
    ],

    symptoms: [
      'Urinary urgency',
      'Bladder or pelvic pain',
      'Leakage of urine',
      'Frequent urination',
      'Numbness or tingling in legs',
      'Blood in the urine (not in all patients)',
    ],

    diagnosis: [
      'Physical examination and symptom check',
      'Lab tests, such as assessing the pressure in the bladder and certain nerve functioning tests',
    ],

    management: [
      'Regular and directed use of medicines',
      'Light Pelvic floor exercises',
      'Use of adult diapers (if necessary)',
      'Surgery (if required)',
    ],

    whenToConsultDoctor:
      "Early diagnosis can lead to effective and successful treatment. If you experience any of the symptoms mentioned above, such as leakage of urine or frequent urge to urinate, please see a doctor.",
  },

  'bleeding': {
    title: "Bleeding",

    description:
      "Bleeding is defined as the loss of blood. It may be normal or abnormal, the latter is concerning and requires immediate attention. Bleeding can occur externally or internally; external bleeding occurs in the case of cuts and tears while internal bleeding takes place during organ damage.",

    causes:
      "The causes for bleeding include Hemophilia (bleeding disorder), Vitamin K deficiency, Leukemia, cuts, tears, and lacerations, tissue damage, liver disease, Von Willebrand disease, injury and trauma, heavy or abnormal menstruation, and gunshot wounds.",

    riskFactors: [
      'Vitamin K deficiency',
      'Nutritional deficiencies',
      'Tumors',
      'Cancers',
      'Anemia (lack of hemoglobin or red blood cells)',
      'Gender (females may bleed more)',
    ],

    symptoms: [
      'Pain at the injured site',
      'Discomfort',
      'Swollen injury site',
      'Pale, sweaty skin',
      'Unconsciousness (in severe cases)',
    ],

    diagnosis: [
      'Physical examination',
      'Symptom check',
      'Certain lab tests to determine underlying causes',
    ],

    management: [
      'Cleaning and disinfecting the wound',
      'Stopping the bleeding with a clean cloth or bandage',
      'Apply gauze or tourniquet',
      'Immobilization of the affected part to minimize bleeding',
    ],

    whenToConsultDoctor:
      "Early diagnosis can lead to effective and successful treatment. If you experience persistent heavy bleeding, please see a doctor.",
  },

  'bloating': {
    title: "Bloating",

    description:
      "Bloating occurs when there is a storage or build-up of water and/or gases in your intestines and other bodily tissues, making the stomach area visibly swollen.",

    causes:
      "Causes of bloating include reduced bowel movements, anorexia, stomach ulcers, anxiety, water retention, indigestion, Irritable bowel syndrome (IBS), menopause, smoking, dehydration, increased fat in diet, and menstruation.",

    riskFactors: [
      'Bacterial imbalances (disruption in the normal amount of bacteria in the gut)',
      'Food sensitivities (e.g. gluten or lactose)',
      'Low stomach acid (prevents proper breakdown of food)',
      'Hormonal imbalances (dysregulation in hormone levels)',
      'Damaged intestinal lining',
    ],

    symptoms: [
      'Abdominal fullness',
      'Abdominal tightness',
      'Distension in abdomen',
      'Increase in burping or flatulence',
      'Cramps',
      'Pain',
      'Shortness of breath',
      'Diarrhea',
      'Lower back pain',
    ],

    diagnosis: [
      'Detailed medical and dietary history (including duration, triggers, menstrual cycle relation)',
      'Physical examination, specifically palpating the abdomen for masses or swelling',
    ],

    management: [
      'Diet management: Stop overeating, limit fats, and eat slowly/properly chew food',
      'Avoid habits that increase swallowed air (drinking through a straw, chewing gum, carbonated beverages, sucking on hard candy)',
    ],

    whenToConsultDoctor:
      "A doctor should be consulted if you’re troubled by bloating on a regular basis; otherwise there is nothing to worry about temporary bloating.",
  },

  'breast-cancer': {
    title: "Breast Cancer",

    description:
      "Cancer is an abnormal growth of cells. Breast cancer is the 2nd most common cancer in females, where cells of the breast multiply in an uncontrolled way. It typically forms in lobules (glands that produce milk) but can also form in fatty or fibrous connective tissue, and can invade surrounding healthy tissue. Lymphatic spread is the primary route of metastasis.",

    causes:
      "The exact causes are not completely known, but genetic mutations majorly contribute to its development. Family history of breast cancer and recurrence in previously treated females are also strong relational factors.",

    riskFactors: [
      'Age (Women over the age of 60 are more commonly diagnosed)',
      'Gender (Much more common in females, though it can affect men)',
      'Presence of BRCA1 and BRCA2 gene mutations',
      'Family tendency or family history of cancer',
      'Radiation exposure',
      'Taking hormone therapy',
      'Early onset of menstruation and late menopause',
      'Alcohol consumption and smoking',
      'Women who have never had children, or had them over the age of 35',
    ],

    symptoms: [
      'A lump that can be differentiated from normal breast tissue (collarbone area, breast area, or armpit)',
      'Any change in appearance, shape, or size',
      'Skin thickening or redness',
      'Itching or warmth felt in the breast',
      'Changes in the nipple, or nipple discharge',
    ],

    diagnosis: [
      'Complete medical history and physical breast exam',
      'Breast ultrasound',
      'Mammogram (X-ray of breast)',
      'Breast biopsy (sample of breast tissue for examination)',
      'Breast MRI',
    ],

    management: [
      'Medication (raloxifene, tamoxifen, etc.)',
      'Radiation therapy',
      'Chemotherapy',
      'Hormone therapy',
      'Surgery (such as mastectomy to remove the breast)',
    ],

    whenToConsultDoctor:
      "A doctor should be consulted if you feel like you are experiencing any of the symptoms of breast cancer. It is also best to get checked on a yearly basis if there is a history of breast cancer in your family.",
  },

  'bronchitis': {
    title: "Bronchitis",

    description:
      "Bronchitis refers to an inflammation in the bronchial tubes, which deliver air to the lungs. This inflammation leads to mucus production and coughing. Acute bronchitis improves within 2-3 weeks, while chronic bronchitis (mucus and cough returning for around 2 years, often due to smoking) occurs alongside emphysema and is collectively called COPD.",

    causes:
      "Acute bronchitis is commonly caused by viruses (Rhinovirus, Adenovirus, Influenza) or bacteria in people with pre-existing diseases (Mycoplasma, Streptococcus, Haemophilus). Chronic bronchitis is caused by long-term smoking or exposure to air pollution/irritants like smoke, smog, and toxic gases.",

    riskFactors: [
      'Exposure to irritants (toxic fumes, smoke at work/home)',
      'Age (children younger than 5 years are at an increased risk)',
      'Smoking (chain-smoking and passive smoking)',
      'Family history',
      'Asthma and weak immune system',
    ],

    symptoms: [
      'Productive cough',
      'Low grade fever with chills',
      'Sore throat',
      'Difficulty breathing',
      'Chest congestion',
      'Nose stuffiness',
      'Headaches',
    ],

    diagnosis: [
      'Detailed medical history regarding symptoms',
      'Physical exam along with breathing tests',
      'Spirometry to check proper breathing',
      'Lung function tests and chest X-Rays in some cases',
    ],

    management: [
      'Acute: Home remedies (humidifier, lozenges), ibuprofen/paracetamol for fever, staying hydrated and resting',
      'Chronic: Inhalers with bronchodilators, antibiotics/corticosteroids, oxygen therapy, regular exercise, and smoking cessation',
    ],

    whenToConsultDoctor:
      "Consult a doctor if you develop a high fever with chills along with the cough, symptoms are not improving, you are suddenly short of breath, your heart is beating too fast, or your nails/lips look blue.",
  },

  'burning-mouth-syndrome': {
    title: "Burning Mouth Syndrome",

    description:
      "Burning mouth syndrome (BMS) describes different types of sensations occurring in the mouth, predominantly burning, but also tingling, scalding, or numbness. It can affect any part of your mouth but commonly involves lips, tongue, and the palate.",

    causes:
      "Primary causes are unclear. Secondary causes include gastric acid reflux, allergic reactions to dental appliances, anxiety/depression, hormonal imbalance (diabetes, menopause, thyroid disease), dry mouth (xerostomia), lack of vitamins/minerals, and oral thrush (yeast infection).",

    riskFactors: [
      'Acidity problems (backflow of acid from stomach)',
      'Diseases that lower immunity (e.g. Diabetes)',
      'Dry mouth linked to radiation therapy or Sjogren\'s syndrome',
      'Fungal infection of the mouth (thrush)',
      'Deficiency of iron, folic acid, and vitamins',
      'Administration of blood pressure medicines',
      'Oral habits (biting the tip of the tongue or grinding teeth)',
      'Excessive mouth irritation (overzealous brushing, acidic drinks)',
      'Physical or emotional distress',
      'Female gender, Age over 50, and postmenopausal status',
    ],

    symptoms: [
      'Burning sensation on single or multiple places in the oral cavity',
      'Numbness or tingling (sharp pain) which may be continuous or intermittent',
      'Trouble swallowing',
      'Dry mouth and sore throat',
      'Increased thirst',
      'Alteration in taste',
    ],

    diagnosis: [
      'Examining the mouth for infections, problematic dentures, or signs of acidity',
      'Complete medical history',
      'Blood sugar test (random and fasting) to check for Diabetes',
      'Allergy tests',
      'Saliva flow tests to measure production',
      'Biopsy of mouth tissue if condition persists',
    ],

    management: [
      'Identify and treat the underlying causative factor (for secondary causes)',
      'Pain-relieving medicines and mouthwashes',
      'Vitamin supplements',
      'Hormone replacement in women',
    ],

    whenToConsultDoctor:
      "Consult a doctor if your symptoms worsen, there is no improvement, you experience side effects from medicines, you start feeling anxious/depressed, or if there is a general feeling of discomfort.",
  },

  'burns': {
    title: "Burns",

    description:
      "Burns are severe skin injuries that lead to the death of affected skin cells, commonly seen as household injuries. Degrees include First degree (red, painful, non-blistered), Second degree (blisters, severe pain, skin thickening), and Third-degree (severe damage, white/leathery appearance).",

    causes:
      "Burns are caused by contact with scalding hot or boiling liquids, chemical burns, electrical burns, fires (matches, stoves, candles, lighters), and excessive or persistent skin exposure to heat.",

    riskFactors: [
      'Females (higher risk than males)',
      'Children and elderly',
      'Low socioeconomic living conditions',
      'Professions increasing exposure to fire (e.g. firemen)',
      'Individuals who frequently use the stove',
      'Underlying medical conditions (insanity, epilepsy)',
      'Alcohol abuse and smoking',
      'Use of kerosene (paraffin) as fuel domestically',
      'Inadequate safety measures in homes or workplaces',
    ],

    symptoms: [
      'First degree: Dry, peeling skin, minor swelling, redness, pain',
      'Second degree: Blister formation, red inflamed skin, pain',
      'Third degree: White waxy skin, char formation, dark brown/reddish skin, swelling, raised leathery texture, severe pain',
    ],

    diagnosis: [
      'Physical examination to assess degree of burn',
      'Check of relevant symptoms',
      'Lab tests if necessary for further complications',
    ],

    management: [
      'First degree: Soak wound in cool water, painkillers, aloe vera gel, antibiotic ointment, gauze',
      'Second degree: Soak wound in cool water (15+ mins), painkillers, antibiotic ointment',
      'Third degree: Immediate medical attention required',
    ],

    whenToConsultDoctor:
      "First degree burns can be treated at home, but second and third degree burns must be assessed by a doctor as they can cause significant skin damage and irreversible complications. Chemical and electrical burns also require immediate medical attention.",
  },

  'candidiasis': {
    title: "Candidiasis",

    description:
      "Candidiasis is a fungal infection caused by an overgrowth of Candida Albicans, commonly found in the GI tract, vagina, mouth, and skin. Types include oral thrush, vaginal yeast infection, skin candidiasis, and invasive candidiasis (where candida enters the bloodstream).",

    causes:
      "Overgrowth leading to infections can be caused by the use of antibiotics, oral contraceptives, hormone therapy, pregnancy, and uncontrolled diabetes.",

    riskFactors: [
      'Oral thrush: Dentures, Cancer, HIV/AIDS, Diabetes, Smoking, Dry mouth, Corticosteroids',
      'Vaginal yeast infection: Pregnancy, Oral contraceptives, Diabetes, Antibiotics, Suppressed immune system',
      'Skin candidiasis: Use of too much moisturizers/soaps, moist warm areas (groin, armpits)',
      'Invasive candidiasis: ICU patient, Diabetes, Kidney failure, Weak immune system, Recent surgery',
    ],

    symptoms: [
      'Oral: White patches in mouth, cracked corners of mouth, burning sensation, loss of taste',
      'Vaginal: Itching, white cottage cheese-like discharge, pain during intercourse, burning during urination, swelling/redness',
      'Invasive: Persistent fever and chills, nausea, constipation/diarrhea, joint pain',
      'Skin: Itching, irritation, redness',
    ],

    diagnosis: [
      'Medical history and physical examination of the lesions or discharge',
      'Scrapings or samples of lesions/discharge tested under a microscope',
      'Blood tests for invasive forms or to rule out underlying diseases',
      'Pelvic exams (for vaginal infections)',
    ],

    management: [
      'Oral thrush: Antifungal liquids, tablets, or lozenges',
      'Genital infections: Antifungal creams/suppositories (butoconazole, clotrimazole) or oral fluconazole',
    ],

    whenToConsultDoctor:
      "A doctor should be consulted if the prescribed treatment has not managed your symptoms effectively, or if your infections keep recurring even after being treated.",
  },

  'cervical-cancer': {
    title: "Cervical Cancer",

    description:
      "The cervix is a part of the uterus that serves as a passageway between the vagina and uterus. Cervical cancer results when there is an abnormal growth of cells in these tissues.",

    causes:
      "Nearly all instances of cervical cancer develop as a result of the human papilloma virus (HPV), a sexually transmitted infection which develops into cervical cancer if left untreated.",

    riskFactors: [
      'Sexually transmitted infections like Chlamydia or Herpes',
      'Usage of contraceptives',
      'Early sexual experience',
      'High number of pregnancies',
      'Many sexual partners',
      'Smoking',
      'Oral contraceptives use for five or more years',
      'Weakened immune system (e.g. HIV)',
    ],

    symptoms: [
      'Unusual vaginal discharge',
      'Bleeding after menopause',
      'Unexplained weight loss',
      'Abnormal vaginal bleeding',
      'Discomfort while urinating',
      'Pain in the legs or back',
      'Loss of bladder control',
      'Pain or bleeding after intercourse',
      'Constant fatigue and decreased appetite',
      'Heavier periods',
    ],

    diagnosis: [
      'Pap test (Pap smear) to examine scraped cells under a microscope',
      'Cone biopsy to excise and examine a large area of tissue around the cervix',
      'Vaccination history (as the HPV vaccine prevents the root cause)',
    ],

    management: [
      'Early Stage: Cryotherapy (freezing cells) or Loop electrosurgical excision (uses electricity to kill/remove cells)',
      'Advanced Stage: Surgery to remove cancer tissue, Chemotherapy, and/or Radiotherapy',
    ],

    whenToConsultDoctor:
      "Visit a gynecologist if you experience the symptoms mentioned above. Get screening done regularly and act quickly by consulting a doctor when symptoms appear to reduce risk greatly.",
  },

  'chronic-gout': {
    title: "Chronic Gout",

    description:
      "Gout is a painful condition which causes sudden and intense pain of the joints along with swelling. The big toe is most commonly affected, but the knee, thumb, elbow, or fingers may also be affected.",

    causes:
      "Gout is caused by an excess of uric acid in the blood, either due to increased production or reduced excretion. This tendency is usually inherited, but is also associated with obesity, excess alcohol (beer), injuries, certain medicines, high seafood/meat intake, kidney disorders, and enzyme deficiencies.",

    riskFactors: [
      'More common after the age of 60',
      'Men have a higher risk between 30 and 50 years of age',
      'Women are at a greater risk after menopause',
      'Overweight and hypertensive men',
      'Taking thiazide diuretics',
    ],

    symptoms: [
      'Sudden and very severe joint pain (usually occurring at night or early morning)',
      'Tender and stiff affected joint',
      'Swelling and redness of the joint',
      'Bone damage if left untreated',
    ],

    diagnosis: [
      'Physical examination',
      'Blood tests (uric acid levels)',
      'X-Rays',
    ],

    management: [
      'Pain killers to reduce pain',
      'Non-Steroidal anti-inflammatory drugs (NSAIDs) such as indomethacin',
      'Colchicine to reduce inflammation',
      'Allopurinol or febuxostat to reduce uric acid production',
      'Lifestyle changes: drinking water, exercise, weight control, and avoiding alcohol/seafood',
    ],

    whenToConsultDoctor:
      "An attack should last 3-10 days. If the prescribed medications are no longer effective, a doctor should be consulted.",
  },

  'chronic-heart-failure': {
    title: "Chronic Heart Failure",

    description:
      "Chronic Heart Failure, characterized by Congestive Heart Failure, is an inability of the heart to pump sufficient amounts of blood through the body to ensure enough supply of oxygen. The heart does not stop, but it is weaker than normal. It is a long-term condition that worsens gradually over time and cannot be completely cured, but can be managed.",

    causes:
      "Chronic Heart failure is a complication of many other conditions and has no single cause. One of the leading causes is coronary artery disease.",

    riskFactors: [
      'Coronary artery disease',
      'Smoking',
      'Obesity',
      'Alcohol intake',
      'High sodium diet',
    ],

    symptoms: [
      'Shortness of breath when lying flat (left-sided heart failure)',
      'Cough',
      'Edema / swelling of legs and ankles (right-sided heart failure)',
      'Dizziness and tiredness',
      'Nausea, constipation, and loss of appetite',
      'Rapid heart beat',
      'Angina or chest pain',
    ],

    diagnosis: [
      'Patient\'s medical history',
      'Electrocardiogram (ECG)',
      'Echocardiogram (ultrasound)',
      'Brain natriuretic peptide (BNP) testing',
      'Chest X-ray',
    ],

    management: [
      'Dietary and lifestyle changes: Stop smoking, lose weight, limit alcohol intake, exercise regularly, limit salt',
      'Medications prescribed by a doctor depending on cause and severity',
    ],

    whenToConsultDoctor:
      "Consult your doctor if your condition persists or worsens, or if you experience symptoms of a heart attack, stroke, headaches, epistaxis (nose bleed), dizziness, or fatigue.",
  },

  'chronic-hepatitis-b': {
    title: "Chronic Hepatitis B",

    description:
      "Hepatitis B is a viral disease that causes inflammation of the liver caused by the HBV virus. A chronic infection refers to an infection that lasts for longer than six months. The chances of the infection becoming chronic are higher in younger patients.",

    causes:
      "The hepatitis virus is transmitted primarily by contacting the blood, semen or body fluid of an infected person. Common transmission routes include unprotected sex, sharing needles, transmission from mother to child during childbirth, and needle prick injuries.",

    riskFactors: [
      'IV drug use through shared needles',
      'Unprotected sex with multiple partners',
      'Healthcare workers exposed to human blood',
      'Men who have sexual intercourse with other men',
      'Infants born to infected mothers',
      'Travelling to areas where infection is common (Asia, Africa, Eastern Europe, Pacific Islands)',
    ],

    symptoms: [
      'Jaundice (yellowish discoloration of the skin and eyes)',
      'Fever and an upset stomach (nausea, reduced appetite, vomiting)',
      'Pale stools and dark colored urine',
      'Fatigue and flu-like symptoms',
      'Complications if unmanaged: Liver failure, liver cancer, liver cirrhosis, or kidney diseases',
    ],

    diagnosis: [
      'Clinical examination and history of symptoms',
      'Blood tests to detect the virus and antibodies',
      'Liver Ultrasound to visualize damage',
      'Liver Biopsy in some chronic disease cases',
    ],

    management: [
      'Antiviral medication (entecavir, tenofovir, lamivudine, adefovir, telbivudine)',
      'Interferon injections',
      'Liver transplant in cases of severe damage',
      'Preventive vaccination',
    ],

    whenToConsultDoctor:
      "A doctor should be consulted if you have been exposed to hepatitis B, if infection is suspected due to signs/symptoms, or if symptoms persist even after treatment.",
  },

  'chronic-obstructive-pulmonary-disease': {
    title: "Chronic Obstructive Pulmonary Disease",

    description:
      "Chronic Obstructive Pulmonary Disease (COPD) is a progressive condition characterized by breathing difficulties due to poor airflow or blockage of the airway passages. It worsens over time if left untreated.",

    causes:
      "Causes include smoking, exposure to lung irritants (such as smoke), poor ventilation in homes, sheesha smoking, and respiratory infections.",

    riskFactors: [
      'Genetic or family history',
      'Frequent exposure to lung irritants',
      'Working around dust, fumes, and chemicals',
      'Severe respiratory infections',
      'Asthma',
      'Respiratory disorders, such as Emphysema',
    ],

    symptoms: [
      'Frequent breathlessness (progressing from strenuous exercises to occurring at rest)',
      'Persistent coughing with or without sputum',
      'Frequent chest infections',
      'Perpetual wheezing',
    ],

    diagnosis: [
      'Physical examination and symptom check',
      'Spirometry Test (measures how deeply and fast air moves into/out of lungs)',
      'Lab tests as required',
    ],

    management: [
      'Cessation of smoking',
      'Avoidance of exposure to lung irritants',
      'Annual flu vaccination or regular vaccination against pneumococcal pneumonia',
      'Medicines',
      'Light breathing exercises',
    ],

    whenToConsultDoctor:
      "Early diagnosis can lead to effective and successful treatment. If your symptoms do not improve within 10 days, or you experience persistent breathlessness and discomfort, please see a doctor.",
  },

  'chronic-psychosis': {
    title: "Chronic Psychosis",

    description:
      "Psychosis is an illness of the brain in which thoughts are disordered and reality distortions occur (hallucinations and delusions). Chronic psychosis requires proper treatment as symptoms like social withdrawal, loss of motivation, and delusions become prominent. It is vital to seek immediate medical help to prevent patients from hurting themselves or others.",

    causes:
      "Causes are varied and include brain diseases (Parkinson’s, Huntington’s, brain cysts/tumors), dementia (Alzheimer’s, HIV, syphilis), drug abuse, lack of sleep, environmental factors, and hormonal changes (postpartum psychosis).",

    riskFactors: [
      'Genetics (having a family member with a past psychotic disorder)',
      'Genetic mutations such as 22q11.2 deletion syndrome',
    ],

    symptoms: [
      'Depressed mood and anxiety',
      'Trouble concentrating',
      'Sleeping too much or very less',
      'Suspiciousness',
      'Delusions and hallucinations',
      'Disorganized speech (changing topics erratically)',
      'Suicidal thoughts or actions',
      'Cold detached behavior and inability to express emotions',
    ],

    diagnosis: [
      'Brief psychiatric & medical history',
      'Brief physical exam and blood tests',
      'Brain imaging like MRI scans to rule out physical illness or drug use',
      'Psychiatric evaluation using specialized interview and assessment tools',
    ],

    management: [
      'Medications: Antipsychotics to manage delusions, hallucinations, and thinking problems',
      'Psychotherapy: Counseling (individual, group, or family)',
      'Outpatient care for most patients',
      'Hospitalization for severe symptoms or self-harm risks',
    ],

    whenToConsultDoctor:
      "If you or anyone you see shows signs of hallucinations, delusions, disorganized thinking/speech, immediately seek medical help to prevent self-harm or harm to others.",
  },

  'cold': {
    title: "Cold",

    description:
      "Cold is a viral infection of the upper respiratory tract including the nose, throat, and pharynx. It is a symptom of various viral infections and may resemble flu, but is generally less severe. It affects both children and adults, though children under 6 are most affected.",

    causes:
      "Cold can be caused by various viruses, but the most common is the rhinovirus, which transfers from person to person (or surface to person) and enters through the eyes, nose, or mouth.",

    riskFactors: [
      'Age (children under 6)',
      'Immunocompromised state',
      'Environment',
      'Season',
      'Smoking',
    ],

    symptoms: [
      'Runny nose',
      'Sneezing',
      'Malaise',
      'Loss of smell',
      'Watery eyes',
      'Headache',
      'Chills',
      'Low grade fever',
    ],

    diagnosis: [
      'Diagnosis is typically based on signs and symptoms',
      'Chest X-ray to exclude other causes if necessary',
    ],

    management: [
      'Medications: painkillers, decongestant nasal sprays, cough syrup',
      'Preventive measures: washing hands, avoiding sick people, covering mouth while coughing',
      'Home remedies: chicken soup, plenty of water, salt water gargles, yoghurt, rest',
    ],

    whenToConsultDoctor:
      "In adults, consult a doctor if fever exceeds 103.4 F, lasts more than 5 days, or if breathlessness/severe throat pain occurs. In children, consult immediately if fever is > 100.4 F, returns after a fever-free period, or if headache, excessive drowsiness, ear pain, or wheezing occurs.",
  },

  'congestion': {
    title: "Congestion",

    description:
      "Congestion, commonly known as a stuffy nose, is frequently a symptom of a minor or major health problem such as a sinus infection or the common cold.",

    causes:
      "Short-term congestion is usually due to colds. Long-term causes include allergies, deviated nasal septum, environmental irritants, chronic sinusitis, nasal polyps, hay fever, chemical exposures, hormonal fluctuations, and early pregnancy.",

    riskFactors: [
      'Deviated nasal septum',
      'Nasal Polyps',
      'Dental infection',
      'Asthma',
      'Allergies',
      'Aspirin sensitivity',
      'Regular exposure to irritants such as smoke',
    ],

    symptoms: [
      'Runny or stuffy nose',
      'Nasal pain and irritation',
      'Headache',
      'Mucus accumulation',
      'Swollen nasal tissues',
      'Red or irritated eyes',
      'Fatigue',
    ],

    diagnosis: [
      'Physical exam and assessment of symptoms',
      'ENT examination of ears, nose, and throat to determine exact cause',
    ],

    management: [
      'Avoiding exposure to irritants or pollutants',
      'Use of prescribed medicines',
      'Humidifiers and steam',
      'Keeping your head elevated to promote mucus flow',
      'Saline sprays',
    ],

    whenToConsultDoctor:
      "See a doctor if symptoms do not improve within 10 days, if congestion is accompanied by high fever for > 3 days, if discharge is green/abnormal with sinus pain, or if you have a weak immune system, asthma, or emphysema.",
  },

  'constipation': {
    title: "Constipation",

    description:
      "Constipation is defined as scarce bowel movements; less than 3 times a week and difficulty in passing stool which continues for a long time. It causes feces to become hard and dry as it stays in the colon for an extended period.",

    causes:
      "Causes include intestinal blockage, neurological problems (Parkinson's, spinal cord injury, MS), pelvic muscle issues, certain medicines (antacids, calcium channel blockers, opioids), a diet poor in fiber, hormonal disorders (diabetes, hypothyroidism), dehydration, and stress.",

    riskFactors: [
      'Advanced age',
      'Dehydration',
      'Lack of physical activity',
      'Insufficient fiber intake',
    ],

    symptoms: [
      'Difficulty in passing stool',
      'Dry and hard stool',
      'Pain in abdomen',
      'Pain during defecation',
      'Bloating',
      'Loss of appetite',
      'Nausea',
    ],

    diagnosis: [
      'Detailed history and physical/rectal examination',
      'Blood tests',
      'X-Ray',
      'Sigmoidoscopy or Colonoscopy',
      'MRI',
    ],

    management: [
      'Lifestyle changes: Exercise, intake of fiber-rich foods, adequate water',
      'Laxatives',
      'Medicines: Lubiprostone, linaclotide, prucalopride, naloxegol',
      'Surgery in cases of blockage or stricture',
    ],

    whenToConsultDoctor:
      "Consult your doctor when you observe continuous unusual bowel habits and face difficulty in passing stool.",
  },

  'cough': {
    title: "Cough",

    description:
      "Cough is a sudden, expulsive reflex to clear out irritants from the respiratory tract. Types include dry cough (itchy throat, no mucus) and productive/wet cough (mucus production, congested feeling). It is classified as acute (<3 weeks) or chronic (>3 weeks).",

    causes:
      "Acute causes: Flu, common cold, laryngitis, bronchitis, pneumonia, sinusitis, pharyngitis. Chronic causes: Smoking, asthma, post-nasal drip, COPD, GERD, ACE inhibitors, tuberculosis, lung cancer.",

    riskFactors: [
      'Active and passive smoking',
      'Allergies',
      'Air pollution',
      'Industrial fumes and smoke',
      'Asthma',
    ],

    symptoms: [
      'Runny and stuffy nose',
      'Post-nasal drip',
      'Sore throat',
      'Hoarseness of voice',
      'Wheezing',
      'Shortness of breath',
      'Heartburn or sour taste in mouth',
      'Expulsion of mucus or coughing up blood',
    ],

    diagnosis: [
      'Detailed medical history and physical chest/breath sound inspection',
      'Blood test',
      'Pulmonary function test',
      'Chest X-ray',
      'Sputum test/culture',
    ],

    management: [
      'Antitussive drugs or cough suppressants',
      'Antibiotics',
      'Asthmatic drugs (steroids and bronchodilators)',
      'Anti-tuberculosis drugs',
    ],

    whenToConsultDoctor:
      "Consult a doctor if cough does not resolve within 3 weeks, worsens, involves coughing up blood, is associated with vomiting, chest pain, weight loss, neck lumps, voice alteration, high fever, or shortness of breath.",
  },

  'cramps': {
    title: "Cramps",

    description:
      "Cramps are sudden, involuntary, and painful contractions of one or more muscles, lasting from seconds to minutes. They can temporarily hamper life. Commonly affected muscles include the back of the thigh, and front/back of the lower leg.",

    causes:
      "Known causes include overuse of muscles, dehydration, muscle injury, low levels of calcium/potassium/magnesium/sodium, spinal nerve compression, pregnancy, alcoholism, kidney failure, hypothyroidism, and impaired blood supply to legs/feet.",

    riskFactors: [
      'Tight, inflexible muscles',
      'Poor physical condition or muscle tone',
      'Inadequate diet',
      'Physical overexertion',
      'Muscle injury or fatigue',
      'Dehydration',
    ],

    symptoms: [
      'Sudden and sharp pain',
      'Presence of a hard lump of muscle tissue beneath skin',
      'Firmness of affected muscle',
      'Tenderness',
      'Restricted movement of affected muscle',
    ],

    diagnosis: [
      'Medical history',
      'Laboratory investigations to check electrolyte or organ function',
      'Physical examination of the affected muscle (assessing severity, duration, and aggravating factors)',
    ],

    management: [
      'Stretching and massaging the affected muscle',
      'Applying heat to tense muscles or cold to sore muscles',
      'Hydration and electrolyte replenishment',
      'Treating underlying medical conditions',
    ],

    whenToConsultDoctor:
      "You should consult a doctor if cramps cause severe discomfort, are associated with swelling, redness, skin changes, or muscle weakness, happen frequently, do not improve with self-care, and lack an apparent cause like overexertion.",
  },

  'crohns-disease': {
    title: "Crohn's Disease",

    description:
      "Crohn’s disease is a lifelong chronic inflammatory disorder of the GI tract. It can occur in any part of the tract, but mostly affects the small intestine and colon. Its severity varies and can sometimes lead to life-threatening conditions. The exact reason is unknown but relates to an overactive immune system.",

    causes:
      "The exact cause is unknown, but it is associated with environmental factors, genetic factors, and abnormal immune system reactions.",

    riskFactors: [
      'Family tendency (having a close family member with the disease)',
      'Smoking',
      'Eastern European Jewish background',
    ],

    symptoms: [
      'GI disturbance',
      'Diarrhea',
      'Nausea',
      'Fever',
      'Weight loss',
      'Tiredness',
      'Blood and mucus in stool',
      'Abdominal cramps',
    ],

    diagnosis: [
      'Physical examination',
      'Barium Tests and X-Rays',
      'Stool sample and analysis',
      'Colonoscopy',
      'CT scan, MRI',
      'Biopsy in some cases',
    ],

    management: [
      'Lifestyle/Diet changes: Avoiding trigger foods (fats, sugar, spices, lactose)',
      'Corticosteroids',
      'Antidiarrheals',
      'Anti-inflammatory medications',
      'Antibiotics and immunomodulators',
      'Surgery in severe cases',
    ],

    whenToConsultDoctor:
      "Consult a doctor if you experience bloody stools, fever, persistent diarrhea unresponsive to antidiarrheals, or severe continuous abdominal pain.",
  },

  'cushings-disease': {
    title: "Cushing's Disease",

    description:
      "Cushing's disease occurs due to the overproduction of cortisol. This overproduction is driven by a benign pituitary tumor (adenoma) causing excessive secretion of ACTH, leading to hypercortisolism.",

    causes:
      "Caused by a benign pituitary adenoma producing excessive ACTH, which stimulates the adrenal glands to release high quantities of cortisol. (Other forms of Cushing's syndrome are caused by adrenal tumors or steroid medications).",

    riskFactors: [
      'Presence of benign pituitary or adrenal tumors',
      'Long-term use of steroid medications',
    ],

    symptoms: [
      'Unusual weight gain (face, upper back, abdomen) with thin arms/legs',
      'Purple stretch marks on abdomen, thighs, breasts',
      'Easy bruising, acne, slow wound healing',
      'High blood pressure and high blood sugar (diabetes)',
      'Muscle weakness and osteoporosis',
      'Depression, anxiety, mood swings',
      'Irregular periods (women) or erectile dysfunction/decreased libido (men)',
    ],

    diagnosis: [
      '24-hour urinary free cortisol test',
      'Late-night salivary cortisol test',
      'Dexamethasone suppression test',
      'ACTH levels (to differentiate pituitary from adrenal causes)',
      'Imaging tests (MRI for pituitary, CT for adrenal glands)',
    ],

    management: [
      'Surgery: Transsphenoidal surgery to remove pituitary adenoma',
      'Medications: Ketoconazole, metyrapone, or pasireotide (if surgery is not an option)',
      'Radiation Therapy',
      'Adrenalectomy (removal of adrenal glands in severe cases)',
      'Managing complications like diabetes and osteoporosis',
    ],

    whenToConsultDoctor:
      "Consult a doctor if you develop rapid weight gain, purple stretch marks, easy bruising, or extreme muscle weakness.",
  },

  'deep-vein-thrombosis': {
    title: "Deep Vein Thrombosis",

    description:
      "Deep vein thrombosis (DVT) is the formation of a blood clot in deeper veins, usually in the leg. It can be life-threatening if the clot travels to the lungs (pulmonary embolism). When DVT and pulmonary embolism occur together, it is known as a thromboembolism.",

    causes:
      "Causes include injury, inflammation due to infection, trauma during surgery, and immobility or inactivity (such as in bedridden patients).",

    riskFactors: [
      'Advanced age',
      'Cancer',
      'Smoking',
      'Injury',
      'Obesity',
      'Pregnancy',
      'Being bedridden',
      'Use of oral contraceptives',
    ],

    symptoms: [
      'Pain and swelling in the affected area',
      'Redness or skin discoloration',
      'Affected skin feeling warm',
      'Shoulder or neck pain (if clot travels/embolizes)',
    ],

    diagnosis: [
      'Detailed medical history and physical exam for swelling/pain',
      'Ultrasound',
      'Venogram',
      'MRI',
      'D-dimer blood test',
    ],

    management: [
      'Blood thinners (warfarin, heparin)',
      'Thrombolytic medicines (for serious conditions)',
      'Compression stockings',
      'Vena cava filters',
      'Exercise and surgery',
    ],

    whenToConsultDoctor:
      "Consult your doctor immediately if you experience DVT symptoms or pulmonary embolism symptoms such as shortness of breath, coughing with blood, fast heartbeat, or chest discomfort.",
  },

  'dehydration': {
    title: "Dehydration",

    description:
      "Dehydration occurs when there is a loss of water from the body or not enough water to work properly, leading to alarming signs. Water is essential as it regulates temperature, cleanses toxins, protects organs, lubricates joints, and carries nutrients.",

    causes:
      "Caused by excessive loss of water (heavy sweating, heat stroke, high fever, cystic fibrosis, vomiting, diarrhea, burn injuries, excessive urination in diabetes) or inadequate intake (poor access to water, inability to drink due to stomatitis).",

    riskFactors: [
      'Infants (greater tendency to lose fluids quickly)',
      'Old adults (smaller fluid reserve)',
      'People with uncontrollable/untreated diabetes',
      'People who work or exercise outside',
    ],

    symptoms: [
      'Muscle cramps',
      'Rapid breathing and heartbeat',
      'Dizziness and headaches',
      'Dry mouth and skin',
      'Fever and chills',
      'Thirst and less urine',
      'Constipation',
      'Bad breath',
      'Skin flushing',
    ],

    diagnosis: [
      'Medical history and physical exam to determine severity/cause',
      'Complete blood count (CBC) or blood cultures to identify infections',
      'Blood chemistries to identify electrolyte abnormalities',
      'Urine analysis for evidence of severity, infection, or uncontrolled diabetes',
      'Chest X-ray, stool cultures, or lumbar puncture in specific cases',
    ],

    management: [
      'Rehydration using oral rehydration solutions (ORS) or Pedialyte',
      'Rest in a cool place and avoid exertion',
      'Drink ionized alkaline mineral water or water with lemon',
      'Eat watery fruits, vegetables, yogurt, bananas, and coconut water',
    ],

    whenToConsultDoctor:
      "Consult a doctor if you or a loved one has had diarrhea for 24 hours or more, is irritable, disoriented, much sleepier than usual, or has bloody/black stool.",
  },

  'dementia': {
    title: "Dementia",

    description:
      "Dementia is caused by disturbances in mental processes affecting a person’s memory, reasoning, planning, learning, attention, language, perception, and behavior.",

    causes:
      "Mainly caused by other diseases and conditions including stroke, Alzheimer’s disease, vitamin deficiencies, thyroid issues, reactions to medications, and brain tumors.",

    riskFactors: [
      'Advancing age',
      'Family history',
      'Head trauma',
      'Strokes',
      'Hypertension',
      'Diabetes mellitus',
      'Depression in old age',
    ],

    symptoms: [
      'Agitation',
      'Problems with vision or perception',
      'Difficulty with familiar tasks at home',
      'Memory difficulties',
      'Confusion with places and time',
      'Social withdrawal',
      'Difficulty planning or solving problems',
      'Misplacing things and problems with judgment',
      'Difficulty recalling words or following a conversation',
    ],

    diagnosis: [
      'Medical, psychiatric, and neurologic history/examination',
      'Cerebrospinal fluid analysis for biomarkers like tau protein and beta-amyloid',
      'PET scan to detect glucose uptake',
      'MRI scan to check for decrease in brain size',
    ],

    management: [
      'Lifestyle modification: Avoid smoking/alcohol, exercise, mental/social activities',
      'Medications: Donepezil, Rivastigmine, Galantamine (memory improvement)',
      'Medications: Carbidopa-Levodopa (for Parkinson’s-related dementia)',
      'Medications: Antidepressants like SSRIs for behavioral disturbances',
      'Using arm bracelets with IDs and GPS shoes to prevent wandering',
    ],

    whenToConsultDoctor:
      "Consult a medical professional if you experience severe memory loss in yourself or a loved one, or if prescribed medications fail to manage symptoms.",
  },

  'depression': {
    title: "Depression",

    description:
      "Depression or major depressive disorder is a very common mood disorder that negatively affects the way you think, feel, or do things. It is characterized by a constant feeling of sadness, helplessness, and loss of interest, severely hampering daily life and relationships.",

    causes:
      "Causes include family history, grief, physical/emotional/sexual abuse, stressful life events (moving, job loss, divorce), certain medications (steroids, interferon alpha), hormonal changes (pregnancy), and pessimistic personality traits.",

    riskFactors: [
      'Pessimistic, self-deprecating personality or low self-esteem',
      'Childhood trauma or sexual abuse',
      'Alcohol abuse',
      'Constant stress',
      'Anti-hypertensive and sleeping pills',
      'Cancer and other serious diseases',
    ],

    symptoms: [
      'Feeling sad, hopeless, or angry over small issues',
      'Sleep disturbances (insomnia or sleeping excessively)',
      'Appetite changes (eating excessively or loss of appetite with weight loss)',
      'Physical symptoms like headaches and back pain',
      'Thoughts of suicide or death',
      'Sluggish body movements, slow thought process, and trouble in decision making',
    ],

    diagnosis: [
      'Detailed medical history and physical examination',
      'Blood tests to rule out other causes and hormonal imbalances',
    ],

    management: [
      'Psychotherapy, cognitive behavioral therapy, or group therapy',
      'Medications: Tricyclic antidepressants, SNRIs, SSRIs',
      'Electroconvulsive therapy or transcranial magnetic stimulation for severe cases',
    ],

    whenToConsultDoctor:
      "A doctor should be consulted if symptoms have not improved with treatment. Seek immediate medical attention if you experience thoughts of self-harm or indulge in substance abuse.",
  },
  'diabetes-insipidus': {
    title: "Diabetes Insipidus",

    description:
      "Diabetes insipidus is a rare disorder characterized by the body's inability to maintain a balance of fluid levels. It is not associated with diabetes mellitus and can occur in anyone. Types include Central diabetes insipidus (pituitary/hypothalamus damage), Nephrogenic diabetes insipidus (kidney inability to respond to ADH), Dipsogenic diabetes insipidus (defect in thirst mechanism), and Gestational diabetes insipidus.",

    causes:
      "Diabetes insipidus occurs due to the body's inability to balance fluid levels. Causes include damage to the pituitary gland or hypothalamus, kidney tubule defects, pregnancy, or damage to thirst-regulating mechanisms.",

    riskFactors: [
      'Autoimmune disease',
      'Pituitary surgery',
      'Birth defects',
      'Certain medications',
      'Traumatic brain injury',
      'Atherosclerosis (hardening of the arteries)',
    ],

    symptoms: [
      'Bedwetting',
      'Tachycardia (Increased heart rate)',
      'Trouble sleeping',
      'Dehydration',
      'Excessive urination and thirst',
      'Elevated serum sodium',
      'Low blood pressure',
      'Dry skin',
      'Irritability',
    ],

    diagnosis: [
      'Glucose levels',
      'Urine test',
      'Plasma anti-diuretic hormone (ADH) check',
      'Serum electrolyte concentration',
    ],

    management: [
      'Water intake to replace the loss of water in the body',
      'Desmopressin',
      'Diuretics like hydrocholorothiazide',
      'Vasopressin',
      'Non-Steroidal Anti-Inflammatory Drugs (NSAIDs)',
      'A low-solute diet (mostly low-sodium, low-protein diet)',
    ],

    whenToConsultDoctor:
      'A doctor should be consulted if the medications prescribed are not helping in managing the symptoms, or if you experience any side effects from the medication prescribed.',
  },

  'diarrhea': {
    title: "Diarrhea",

    description:
      "Diarrhea is a very common disorder characterized by the passage of loose or watery stools or increased frequency of stools. It very commonly results in dehydration and has three types: acute watery diarrhea, acute bloody diarrhea, and chronic diarrhea.",

    causes:
      "Diarrhea can be caused by bacterial infections (spread through contaminated food/water or poor hygiene), food allergies or lactose intolerance, inflammatory bowel diseases (ulcerative colitis or Crohn’s Disease), viral infections, certain medicines, diabetes, hyperthyroidism, and Irritable Bowel Syndrome.",

    riskFactors: [
      'Poor personal hygiene',
      'Improper handling of food and water',
      'Usage of untreated water',
      'Children under 5 years of age',
      'Male gender',
      'Weak immunity',
    ],

    symptoms: [
      'Pain or cramps in the abdomen or stomach',
      'The urge to pass stools frequently',
      'Weakness, dehydration, and bloating',
      'Loose or watery stools',
      'Fever',
      'Bloody stools',
      'Nausea and vomiting',
    ],

    diagnosis: [
      'Complete medical history and simple physical exam',
      'Blood tests',
      'Stool culture',
      'Colonoscopy',
      'Sigmoidoscopy',
    ],

    management: [
      'Management of dehydration (Rehydration using ORS or intravenous fluids if severe)',
      'Antibiotics',
      'Anti-motility agents',
      'Bismuth compounds',
      'Codeine phosphate',
    ],

    whenToConsultDoctor:
      'Consult a doctor if you are feeling very dehydrated with decreased urine or rapid heart rate, experience severe stomach pain, have stools that contain blood or appear tarry (black), have a persistent high fever, or if your diarrhea has not gotten better after 2 days.',
  },

  'diphtheria': {
    title: "Diphtheria",

    description:
      "Diphtheria is a serious bacterial infection caused by Corynebacterium diphtheriae that primarily affects the mucous membranes of the throat and nose. If left untreated, it can cause severe respiratory and systemic complications.",

    causes:
      "Diphtheria is caused by the bacteria Corynebacterium diphtheriae and spreads through coughing or sneezing from an infected person, or by touching infected wounds or objects contaminated with the bacteria.",

    riskFactors: [
      'Incomplete vaccination or no immunization at all',
      'Living in unhygienic conditions',
      'Travelling to countries where diphtheria is endemic',
    ],

    symptoms: [
      'Painful, red sores or ulcers on the skin',
      'Fever and chills',
      'Hoarseness in the voice and difficulty in swallowing',
      'Sore throat',
      'Thick, grayish membrane covering the throat and tonsils',
      'Swollen glands in the neck',
      'Difficulty breathing',
    ],

    diagnosis: [
      'Throat culture: Swab from the throat or lesion to detect Corynebacterium diphtheriae',
      'Toxin detection: Tests to confirm toxin production by the bacteria',
    ],

    management: [
      'Antitoxin: Administered intravenously or intramuscularly to neutralize the toxin',
      'Antibiotics: Common antibiotics like penicillin and erythromycin to kill bacteria',
      'Supportive care: Airway management and treatment of complications in severe cases',
    ],

    whenToConsultDoctor:
      'Treatment for diphtheria needs to be immediate. Seek urgent medical care if you suspect exposure or exhibit symptoms like a grayish membrane in the throat or difficulty breathing.',
  },

  'diverticulitis': {
    title: "Diverticulitis",

    description:
      "Diverticula are small, bulging pouches that can form in the lining of the digestive system, most often in the lower part of the large intestine (colon). When one or more of these pouches become inflamed or infected, the condition is known as Diverticulitis. It can cause severe abdominal pain, fever, nausea, and a marked change in bowel habits.",

    causes:
      "Diverticula develop when naturally weak places in the colon give way under pressure, causing marble-sized pouches to protrude. Diverticulitis occurs when these diverticula tear, resulting in inflammation or infection. It is likely caused by a combination of genetic and environmental factors.",

    riskFactors: [
      'Aging (incidence increases with age)',
      'Obesity',
      'Smoking',
      'Lack of exercise',
      'Diet high in animal fat and low in fiber',
      'Certain medications (steroids, opioids, NSAIDs like ibuprofen and naproxen sodium)',
    ],

    symptoms: [
      'Constant pain persisting for several days (usually in the lower left side of the abdomen, though sometimes the right side)',
      'Nausea and vomiting',
      'Abdominal tenderness',
      'Constipation or, less commonly, diarrhea',
    ],

    diagnosis: [
      'Physical examination and medical history review',
      'Blood tests to reveal high white blood cell count (indicating infection)',
      'Computer tomography (CT) scan (often the most helpful)',
      'Barium enema X-ray',
    ],

    management: [
      'Bed rest',
      'Liquid diet and stool softeners',
      'Antibiotics',
      'Antispasmodic drugs',
      'Surgery (for severe or recurring cases)',
    ],

    whenToConsultDoctor:
      'Get medical attention anytime you have constant, unexplained abdominal pain, particularly if you also have a fever and constipation or diarrhea.',
  },

  'dry-rough-skin': {
    title: "Dry/Rough Skin",

    description:
      "Skin dryness is a problem faced by people with naturally dry skin as well as those with oily skin. Dry skin feels rough, becomes itchy, and marks or scars easily.",

    causes:
      "Causes and exacerbating factors include weather changes, using harsh chemicals in cosmetics/creams/soaps, hot showers stripping moisture, frequent washing, allergies to clothing/jewelry, occupational exposure (cement, paints), and certain medicines (cholesterol drugs, diuretics).",

    riskFactors: [
      'Family history of skin diseases like psoriasis or eczema',
      'Old age (less oil production by skin pores)',
      'Medical conditions like diabetes, vitamin deficiencies, or hypothyroidism',
    ],

    symptoms: [
      'Itchy patches that turn red or white due to scratching',
      'Hard, scaly, or flaky skin',
      'Rough sandpaper-like texture',
      'Painful cracked skin',
      'Wrinkly skin giving an aged look',
      'Dry eyes and reduced tear production',
    ],

    diagnosis: [
      'Physical examination by a dermatologist',
      'Review of food, medicines, jewelry, and fabrics that may trigger reactions',
      'Diagnostic tests to check for diabetes, vitamin deficiency, or hypothyroidism',
    ],

    management: [
      'Drinking water to hydrate skin',
      'Eating fresh fruits and raw greens',
      'Taking warm water showers instead of steaming hot ones',
      'Limiting skin contact with soap and water',
      'Using milder skin products',
      'Moisturizing the skin after a bath or wash and using OTC eye ointments',
    ],

    whenToConsultDoctor:
      'When recommended OTC treatments and lifestyle adjustments do not solve the problem, visit a skin doctor for expert advice.',
  },

  'duodenal-ulcers': {
    title: "Duodenal Ulcers",

    description:
      "A Duodenal Ulcer, also known as a Peptic Ulcer, is an inflamed open sore on the inner lining of the intestine. It mostly develops in the first part of the small intestine, known as the duodenum.",

    causes:
      "Causes include an infection (such as by Helicobacter Pylori), regular or uncontrolled use of certain pain relievers (like Aspirin), or other medications (such as steroids, anticoagulants, Fosamax, Actonel).",

    riskFactors: [
      'Alcohol abuse',
      'Active or history of radiation therapy (such as X-rays)',
      'Frequent consumption of spicy foods',
      'Helicobacter Pylori infection',
      'Regular use of NSAIDs like Aspirin and Ibuprofen',
      'Stress',
      'Severe illness',
      'Tobacco use',
    ],

    symptoms: [
      'Burning or excessive abdominal pain',
      'Intolerance or difficulty consuming fatty or spicy foods',
      'Heartburn',
      'Nausea and vomiting',
      'Dark colored stools (black or tarry)',
      'Unexplained weight loss',
      'Fatigue and appetite changes',
    ],

    diagnosis: [
      'Review of eating habits, health history, and medicinal history',
      'Endoscopy (examining the intestinal tract with a camera)',
      'Testing for Helicobacter Pylori infection',
    ],

    management: [
      'Stoppage of ulcer-promoting medicines',
      'Avoiding spicy foods',
      'Cautious use of pain relievers',
      'Regular use of doctor-prescribed medications',
    ],

    whenToConsultDoctor:
      'If your symptoms do not improve within 7-10 days, or you experience intense burning abdominal pain, pain returning after medication, severe nausea/vomiting, or severe heartburn, see a doctor.',
  },

  'dysuria': {
    title: "Dysuria",

    description:
      "Dysuria describes a painful and burning sensation when passing urine. It is mostly experienced by women during pregnancy, and in both men and women experiencing urinary tract infections.",

    causes:
      "Causes include drinking too little water, applying allergic products (deodorants) or wearing nylon underwear, catheter placement, poor genital hygiene, frequent/rough sexual activity, bacterial infections (urethritis, prostatitis, cystitis), and holding urine for long periods.",

    riskFactors: [
      'Candida infection of the vagina',
      'Sexually transmitted infections (syphilis, genital herpes, chlamydia, gonorrhea)',
      'Old age and hormonal effects causing vaginal dryness',
      'Uterine or prostate cancer',
      'High blood pressure and diabetes (damaging kidneys)',
      'Kidney diseases (stones, cysts) causing blockage',
    ],

    symptoms: [
      'Itching, discomfort, and soreness of the genitalia',
      'Pain in the side of the body (kidney location)',
      'Burning sensation on passing urine',
      'Feeling of incomplete emptying and frequent need to pee',
      'Pain during intercourse',
      'Leakage of white fluid',
      'Disturbed nights and routine due to pain',
    ],

    diagnosis: [
      'Medical history (symptoms, sexual activity, medicines, diabetes)',
      'Abdominal/genital examination',
      'Urine lab tests and urine culture',
      'Ultrasound for imaging kidneys and urinary tract',
      'Cystoscopy for viewing the bladder and urethra',
    ],

    management: [
      'Drinking more water, eating fiber/vitamin C-rich diets, quitting smoking/alcohol/caffeine',
      'Antibiotics to treat infections',
      'Painkillers to relieve pain',
      'Flavoxate to help urinary urgency',
      'Surgical correction of kidney stones and cysts',
    ],

    whenToConsultDoctor:
      'Blood spotting, pain, and fever following a urinary tract infection suggest complications and need urgent medical care by a urologist.',
  },

  'eczema': {
    title: "Eczema",

    description:
      "Eczema is a chronic skin disorder characterized by red, itchy, cracked, and rough skin that can exacerbate at any time. It has no permanent cure. Types include Atopic dermatitis, Contact dermatitis (allergic and irritant), Dyshidrotic eczema, Nummular eczema, Seborrheic dermatitis, Stasis dermatitis, and Neurodermatitis.",

    causes:
      "Causes include genetic factors, a suppressed immune system, environmental factors, contact with allergens/chemicals (bleach, detergent, latex), stress, dry skin, fluid leakage from veins, and insect bites.",

    riskFactors: [
      'Family history of eczema',
      'Allergies',
      'Asthma',
      'Hay fever',
      'Contact with chemicals',
      'Environmental irritants',
    ],

    symptoms: [
      'Dry, itchy skin',
      'Red, scaly, swollen skin',
      'Blisters and cracks',
      'Open sores',
      'Rash',
    ],

    diagnosis: [
      'Physical examination of the skin condition',
      'Medical history review',
      'Patch test for allergies',
    ],

    management: [
      'Antihistamines for itching',
      'Corticosteroids to reduce inflammation',
      'Antibiotics to treat secondary infections',
      'Topical immunomodulators',
      'Light therapy for healing rash',
      'Moisturizing skin',
    ],

    whenToConsultDoctor:
      'Consult your doctor when no improvement is observed, eczema aggravates, or you experience fever, redness, and blisters.',
  },

  'edema': {
    title: "Edema",

    description:
      "Edema is the medical term used for swelling caused by excess fluids trapped in the body's tissues. It usually occurs in the feet, ankles, and legs, but it can involve your entire body.",

    causes:
      "Causes include eating too much salt, sunburn, heart failure, kidney disease, liver problems (cirrhosis), pregnancy, lymph node issues (especially after mastectomy), certain medicines, and standing or walking a lot in warm weather.",

    riskFactors: [
      'Congestive heart failure',
      'Nephrotic syndrome',
      'Cirrhosis of liver',
      'Systemic infection',
      'Trauma',
    ],

    symptoms: [
      'Swelling and puffiness in the skin',
      'Stretched skin',
      'Increased overall limb/body size',
      'Shortness of breath and bloating',
      'Skin holds imprints or looks pitted when pressed',
    ],

    diagnosis: [
      'Physical exam and medical history',
      'X-rays or Ultrasound exams',
      'Magnetic resonance imaging (MRI)',
      'Blood tests or urine analysis',
    ],

    management: [
      'Elevating the affected limb higher than your heart',
      'Diuretics (e.g., furosemide) to expel excess fluid',
      'Treating the underlying cause or adjusting medications',
      'Limiting salt intake and avoiding tight clothing',
    ],

    whenToConsultDoctor:
      'See a doctor when you notice stretched skin that forms a pit after being pressed, or if you develop persistent leg pain/swelling (especially after a long flight) as this can indicate deep vein thrombosis (DVT).',
  },

  'endometriosis': {
    title: "Endometriosis",

    description:
      "The endometrium is the inner lining of the uterus. Endometriosis occurs when tissue similar to the endometrium grows outside the uterus on surrounding organs (ovaries, fallopian tubes, pelvis). It thickens and bleeds with each cycle, but the blood cannot escape, leading to irritation and cyst formation.",

    causes:
      "Causes may include 'retrograde menstruation' (where menstrual blood flows backward into the abdomen/pelvis) and weakened immunity failing to destroy displaced endometrial tissue. It primarily affects women before menopause.",

    riskFactors: [
      'Infertility or issues with conceiving',
      'Risk of the overgrown tissue turning aggressive or cancerous over time',
    ],

    symptoms: [
      'Sharp pain and cramps in the pelvis (during periods or usual days)',
      'Irritability and moodiness',
      'Heavy bleeding during periods or bleeding between periods',
      'Pain during intercourse',
      'Nausea, diarrhea, bloating, and constipation during painful days',
      'Lower back and leg pain',
      'Migraines and headaches',
    ],

    diagnosis: [
      'Medical history (regularity of period, flow, cramps, previous pregnancy)',
      'Pelvic exam to feel for tissue lumps',
      'Ultrasound to view tissue growth',
      'Laparoscopy (thin viewing tube inserted into abdomen)',
      'Biopsy for definite diagnosis',
    ],

    management: [
      'Painkillers and hormone therapy',
      'Lifestyle changes: proper sleep and exercise',
      'Conservative surgery (removing cysts while preserving uterus/ovaries)',
      'Hysterectomy (removal of ovaries and uterus as a last resort)',
    ],

    whenToConsultDoctor:
      'Consult your doctor if you experience serious side effects from treatment, or if your symptoms do not improve or worsen despite treatment.',
  },

  'enlarged-prostate-glands': {
    title: "Enlarged Prostate Glands",

    description:
      "The prostate is a small gland surrounding the urethra in males. Multiplication of prostate cells causes enlargement, commonly seen as men age. It is also known as benign prostatic hyperplasia (BPH). It is non-cancerous but severely affects the quality of life by impacting urination.",

    causes:
      "Uncontrolled growth of prostate cells causes the gland to enlarge, which may be driven by age-related sex hormone imbalances.",

    riskFactors: [
      'Age',
      'Family history',
      'Sex hormone imbalance',
      'Obesity',
      'Diabetes',
      'Heart disease',
    ],

    symptoms: [
      'Painful urination',
      'Incomplete emptying of bladder',
      'Nocturia (waking up during the night to urinate)',
      'Dribbling at the end of urination',
      'A sudden need to urinate',
    ],

    diagnosis: [
      'Detailed medical history and physical/rectal examination',
      'Urinalysis and Prostate specific antigen (PSA) test',
      'Post void residual and Urodynamic tests',
      'Cystoscopy',
      'Prostatic biopsy and Intravenous pyelography/urography',
    ],

    management: [
      'Lifestyle changes (avoid alcohol/caffeine, reduce stress, stay warm, urinate promptly)',
      'Alpha blockers (tamsulosin, prazosin, alfuzosin)',
      '5-alpha reductase inhibitors',
      'Antibiotics (if infection is present)',
      'Surgery',
    ],

    whenToConsultDoctor:
      'If you experience any of the symptoms, especially difficulty in passing urine, consult your doctor for necessary tests to clarify and rule out complications.',
  },

  'epilepsy': {
    title: "Epilepsy",

    description:
      "Epilepsy is a chronic neurological disorder characterized by abnormal brain activity leading to periods of unconsciousness, seizures, unusual behavior, loss of sensation, and loss of awareness. Seizures typically last for a few seconds and manifest differently in different people.",

    causes:
      "Seizures occur due to abnormal electrical activity in the brain. Causes include traumatic brain injury, high fever, systemic illness, strokes, cerebrovascular disorders, ischemic brain diseases, brain tumors, Alzheimer’s, maternal drug use, meningitis, and genetics.",

    riskFactors: [
      'Previous head injury or brain tumor',
      'Stroke',
      'Developmental disabilities (cerebral palsy, autism)',
      'Exposure to toxins (lead, carbon monoxide)',
      'High alcohol consumption',
      'Chronic stress',
      'Certain medications',
    ],

    symptoms: [
      'Uncontrollable jerking of muscles',
      'Auras (strange smells, memory flashes, tingling, stomach feelings)',
      'Visual loss or blurring',
      'Dazed, confused, and sleepy state',
      'Headache and loss of muscle tone',
      'Labored breathing',
      'Depression',
    ],

    diagnosis: [
      'Symptom and medical history review by a neurologist',
      'Blood tests',
      'CT and MRI scans (to view brain structures)',
      'ECG/EEG (to determine electrical activity)',
    ],

    management: [
      'Anti-seizure medications',
      'Treating the underlying cause (if known and treatable)',
      'Treating coexisting conditions like anxiety and depression',
    ],

    whenToConsultDoctor:
      'Consult a doctor immediately if a seizure lasts >5 minutes, breathing/consciousness doesn’t return, multiple seizures occur consecutively, you have prolonged high fever, heat exhaustion, are pregnant, have diabetes, or suffer injury during a seizure.',
  },

  'erectile-dysfunction': {
    title: "Erectile Dysfunction",

    description:
      "Erectile dysfunction (ED) is the most common sexual disease in men. It is characterized by the inability to attain or keep a firm penile erection required for sexual intercourse, often due to impulses from the brain failing to reach and relax the penile muscles.",

    causes:
      "ED can be caused by underlying diseases or direct psychological factors. Causes include diabetes, heart disease, high blood pressure, high cholesterol, obesity, atherosclerosis, renal impairment, multiple sclerosis, past prostate/bladder surgeries, stress, anxiety, depression, and smoking/alcohol abuse.",

    riskFactors: [
      'Advancing age',
      'Type II Diabetes',
      'Heart disease',
      'Smoking and Alcohol abuse',
      'Obesity',
      'Stress, anxiety, or depression',
      'Surgeries damaging penile nerves',
      'Use of anti-depressants and anti-hypertensive medicines',
    ],

    symptoms: [
      'Inability to attain an erection',
      'Inability to keep an erection',
      'Reduced sexual desire or need',
    ],

    diagnosis: [
      'Complete medical history and physical examination of testicles and penis',
      'Blood tests to measure glucose, cholesterol, testosterone, or blood cell counts',
      'Ultrasound to check blood flow to the penis',
    ],

    management: [
      'Lifestyle modifications: targeted exercise, yoga (for stress/anxiety), and blood-flow promoting diets',
      'Medicines: Sildenafil (Viagra), tadalafil, vardenafil, and avanafil',
      'Penis pumps to draw blood and sustain an erection',
      'Penile implants (inflatable rods)',
    ],

    whenToConsultDoctor:
      'Consult your doctor if there is no improvement, the condition worsens, or if you experience other symptoms like premature or delayed ejaculation.',
  },

  'eye-inflammation': {
    title: "Eye Inflammation",

    description:
      "Eye inflammation results from bacterial/viral infections, allergies, autoimmune disorders, irritation, or trauma. The eye becomes red, swollen, irritated, or painful as the immune system fights off invaders.",

    causes:
      "Eye inflammation can be caused by viruses, bacteria, and fungi, as well as foreign bodies, injuries, and underlying autoimmune or allergic responses.",

    riskFactors: [
      'Exposure to allergens or harsh chemicals',
      'Bacterial or viral infections',
      'Autoimmune conditions',
      'Eye trauma or injury',
    ],

    symptoms: [
      'Pain and redness',
      'Blurred vision and tearing',
      'Swelling and unusual heat/warmth',
      'Bruising, itching, or dry eyes',
      'Pus or discharge',
      'Uncoordinated eye movements or visual changes',
      'Lumps or nodules on the eyelid',
      'Bulging or protruding eyes',
      'Sensitivity to bright light',
    ],

    diagnosis: [
      'Physical eye examination by an eye specialist to determine the exact cause of inflammation',
    ],

    management: [
      'Prescription eye drops',
      'Treating the underlying infection or allergy',
      'Regular eye checkups',
    ],

    whenToConsultDoctor:
      'Visit a doctor as soon as eye inflammation symptoms occur to get proper treatment. Consult your doctor immediately if your condition persists or worsens.',
  },

  'female-infertility': {
    title: "Female Infertility",

    description:
      "Female infertility is described as the trouble or failure to get pregnant after one year of frequent, unprotected sexual intercourse (or six months if over age 35). Continued miscarriages are also classified under infertility.",

    causes:
      "Known causes include the absence of ovulation, impaired sperm production in the male partner, lack of regular sexual intercourse, and abnormal structures of the fallopian tubes or uterus.",

    riskFactors: [
      'Old age',
      'Hormonal imbalance or abnormal menstrual cycles',
      'Obesity or being underweight (low body fat from extreme exercise)',
      'Endometriosis',
      'Structural abnormalities of reproductive organs',
      'Smoking and Alcohol use',
    ],

    symptoms: [
      'Inability to get pregnant',
      'Irregular menstrual cycles',
      'Prolonged menstrual cycle (lasting longer than 35 days)',
      'Short menstrual cycle (less than 21 days)',
    ],

    diagnosis: [
      'Thorough medical and menstrual history',
      'Symptom assessment',
      'Laboratory investigations (blood tests)',
      'Ultrasound and endometrial biopsy',
    ],

    management: [
      'Medications such as gonadotropins (for hormonal/ovulation issues)',
      'Reconstructive surgery for structural abnormalities',
      'Assisted reproductive technologies like IVF',
    ],

    whenToConsultDoctor:
      'Consult a doctor if you are <35 and haven’t conceived after 1 year, if you are 35-40 and haven’t conceived after 6 months, if you are over 40, or if the condition causes emotional/psychological distress.',
  },

  'fever': {
    title: "Fever",

    description:
      "Fever is a temporary increase in body temperature above the normal 98.6°F (37°C). A temperature of 99°F or higher is considered a fever. It is not a disease itself, but a sign that your body is actively fighting an illness or infection.",

    causes:
      "Causes include viral/bacterial illnesses, autoimmune diseases, inflammatory conditions (like Arthritis), certain medicines (e.g., blood pressure drugs), childhood vaccinations, and heat exhaustion.",

    riskFactors: [
      'Exposure to infectious agents',
      'Underlying inflammatory or autoimmune disorders',
      'Recent vaccinations',
      'Extreme environmental heat',
    ],

    symptoms: [
      'Headache',
      'Shivers and chills',
      'Body ache',
      'Weakness and fatigue',
      'Loss of appetite',
      'Irritability',
    ],

    diagnosis: [
      'Temperature measurement using oral, rectal, ear, or forehead thermometers (oral and rectal being the most accurate)',
    ],

    management: [
      'Rest and hydration',
      'Over-the-counter fever reducers if uncomfortable',
      'Treating the underlying illness causing the fever',
    ],

    whenToConsultDoctor:
      'In adults, a fever is usually not a concern until it reaches 103°F or higher. Consult a doctor if the fever is persistently high or accompanied by severe symptoms.',
  },

  'fibrocystic-breast-disease': {
    title: "Fibrocystic Breast Disease",

    description:
      "Fibrocystic breast disease involves non-cancerous changes that make breasts fibrous (growth of connective tissue) and cystic (fluid-filled cavities). It makes breasts feel lumpy and uncomfortable. It is very common, benign, and often symptomless.",

    causes:
      "The exact cause is unknown, but benign changes are believed to be driven by alterations in progesterone and estrogen levels, usually associated with the menstrual cycle, pregnancy, or lactation.",

    riskFactors: [
      'Women of child-bearing age',
      'Women on hormonal therapy',
      'Overweight individuals',
      'Menopausal women',
    ],

    symptoms: [
      'Swelling and tenderness',
      'Lumpiness in the breast tissue',
      'Increase in lumpiness or tenderness right before menstrual periods',
    ],

    diagnosis: [
      'Physical examination of the lump',
      'Imaging tests: Ultrasound, MRI, and Mammogram',
      'Fine needle aspiration to remove fluid if the lump feels cystic',
      'Biopsy to definitively rule out cancer',
    ],

    management: [
      'Painkillers (acetaminophen, ibuprofen)',
      'Dietary changes: reducing salt, fat, and caffeine intake',
      'Wearing supportive bras',
      'Puncturing of cysts using fine needle aspiration',
    ],

    whenToConsultDoctor:
      'Consult your doctor if you experience any unusual lumps, redness or indentation on breasts, or discharge from the nipples.',
  },

  'fungal-infections': {
    title: "Fungal Infections",

    description:
      "Fungal infections are caused by various types of pathogenic fungi. They can be contagious and contracted through direct contact with contaminated soil, surfaces, or animals. They most commonly affect the skin but can impact other organs.",

    causes:
      "Caused by harmful fungi from the environment entering the body, or normally present fungi multiplying out of control due to an imbalance.",

    riskFactors: [
      'Prolonged use of broad-spectrum antibiotics',
      'Immunosuppression',
      'Indwelling central catheters or total parenteral nutrition',
      'Burns',
      'Working outdoors',
      'Excessive sweating',
      'Poor blood circulation',
    ],

    symptoms: [
      'Burning, itching, and redness of the skin',
      'Blisters and stinging',
      'Changes in skin color',
      'Bald patches on the scalp',
      'Thick, discolored, or cracked nails',
      'Pain and vaginal discharge',
      'Lifting of the nail bed',
    ],

    diagnosis: [
      'Medical history and duration/intensity of symptoms',
      'Close physical inspection of the affected area',
    ],

    management: [
      'Administration of topical or oral antifungal medicines',
    ],

    whenToConsultDoctor:
      'Consult a doctor if the condition worsens, does not improve, infections become recurrent, or if accompanied by general discomfort and lethargy.',
  },

  'gastrinoma': {
    title: "Gastrinoma",

    description:
      "Gastrinoma is a rare gastrin-secreting tumor that can occur in the pancreas but is most commonly found in the duodenum. They are often small and multiple. Over 50% are malignant and metastasize to the liver, and 25% are linked to Multiple Endocrine Neoplasia (MEN) type 1.",

    causes:
      "The exact cause is unknown, though there is a strong genetic link (e.g., MEN type 1 syndrome).",

    riskFactors: [
      'Genetic predisposition (Multiple Endocrine Neoplasia type 1)',
    ],

    symptoms: [
      'Stomach pain',
      'Bloating and weight loss',
      'Nausea and vomiting',
      'Diarrhea',
      'Bleeding',
    ],

    diagnosis: [
      'Gastric pH test',
      'Secretin test',
      'Biopsy',
      'Imaging tests',
    ],

    management: [
      'Surgery is the primary treatment, varying based on the tumor\'s location',
      'Medications to manage acid output',
    ],

    whenToConsultDoctor:
      'Consult your doctor as soon as symptoms start to occur.',
  },

  'gastritis': {
    title: "Gastritis",

    description:
      "Gastritis is an inflammation of the stomach lining. It can occur suddenly (acute) or slowly over time (chronic). Most cases are caused by the same bacteria that cause stomach ulcers. While it can lead to ulcers or stomach cancer, most cases aren't serious and improve quickly with treatment.",

    causes:
      "Caused by Helicobacter pylori (H. pylori) infection, irritation from excessive alcohol use, chronic vomiting, stress, or NSAID use (aspirin/ibuprofen). Other causes include bile reflux and severe viral/bacterial infections.",

    riskFactors: [
      'Bacterial infection (H. pylori)',
      'Regular use of NSAID pain relievers',
      'Older age (thinning stomach lining)',
      'Excessive alcohol use',
      'Severe stress (surgery, injury, burns)',
      'Autoimmune conditions (body attacking own stomach cells)',
      'Other conditions like HIV/AIDS, Crohn\'s, and parasitic infections',
    ],

    symptoms: [
      'Abdominal pain (upper-center/left, radiating to the back)',
      'Bloating and nausea',
      'Vomiting (clear, yellow, green, or containing blood)',
      'Shortness of breath and chest pain (severe)',
      'Foul-smelling, black, or bloody bowel movements',
    ],

    diagnosis: [
      'Personal and family medical history review',
      'Upper endoscopy (with possible biopsy)',
      'Blood tests (for anemia or H. pylori)',
      'Fecal occult blood test (stool test)',
    ],

    management: [
      'Combination of antibiotics (for H. pylori)',
      'Medications that block acid production and promote healing',
      'Antacids to neutralize stomach acid',
      'Hand washing and fully cooking food to prevent H. pylori spread',
    ],

    whenToConsultDoctor:
      'See a doctor if symptoms persist for a week or longer. Seek urgent help for vomiting blood, excessive yellow/green vomit, black/bloody stools, extreme dizziness/fainting, rapid heartbeat, or shortness of breath.',
  },

  'gastroesophageal-reflux-disease': {
    title: "Gastroesophageal Reflux Disease",

    description:
      "Gastroesophageal Reflux Disease (GERD) is a digestive disorder characterized by the backward flow of acidic stomach contents into the esophagus. This acid reflux irritates and damages the esophageal lining. It can be intermittent, occurring once or twice a week.",

    causes:
      "Caused by a weak lower esophageal sphincter or the untimely relaxation of the lower esophageal sphincter, allowing acid to escape upward.",

    riskFactors: [
      'Hiatal hernia',
      'Obesity and Pregnancy',
      'Young age',
      'Delayed emptying of the stomach',
      'Autoimmune diseases (rheumatoid arthritis, lupus)',
      'Smoking',
      'Going to bed immediately after eating',
    ],

    symptoms: [
      'Heartburn (burning sensation in chest radiating to neck/throat)',
      'Difficulty swallowing',
      'Weakened tooth surface',
      'Abdominal discomfort',
      'Frequent burps and farts',
      'Bitter taste in mouth after a burp',
      'Chest pain (especially lying down or bending over)',
    ],

    diagnosis: [
      'Long-standing history of acidity and gastric pain',
      'Endoscopy',
      'pH tests to measure stomach acidity',
      'Manometry (pressure test measuring muscle strength of the esophagus)',
    ],

    management: [
      'Routine changes: exercise, manage weight, avoid eating 2 hours before bed, chew food properly',
      'Dietary changes: low fat, high protein, avoid spicy/fast food, reduce caffeine/alcohol/fizzy drinks, quit smoking',
      'Proton pump inhibitors and H2 Blockers',
      'Antacids',
    ],

    whenToConsultDoctor:
      'Consult a doctor if medicines aggravate symptoms or simple lifestyle measures fail. Untreated GERD can lead to esophagitis, Barrett’s esophagus, or esophageal cancer.',
  },

  'gastrointestinal-diseases': {
    title: "Gastrointestinal Diseases",

    description:
      "Gastrointestinal (GI) diseases affect the GI tract from the mouth to the anus. They are categorized into Functional (GI tract looks normal but moves improperly, e.g., IBS, GERD, diarrhea) and Structural (bowel looks abnormal and works improperly, e.g., colon cancer, polyps, inflammatory bowel disease).",

    causes:
      "Causes include eating a low-fiber diet, lack of exercise, consuming large amounts of dairy, changes in routine (traveling), stress, pregnancy, overusing antidiarrheals, and taking antidepressants.",

    riskFactors: [
      'Inactive lifestyle',
      'Aging',
      'High dairy consumption',
      'Genetic factors',
    ],

    symptoms: [
      'Abdominal pain and discomfort',
      'Vomiting and nausea',
      'Unintentional weight loss',
      'Acid reflux and heartburn',
      'Loss of appetite',
      'Fatigue',
      'Constipation or Diarrhea',
    ],

    diagnosis: [
      'Colonoscopy',
      'GI endoscopy',
      'Capsule endoscopy',
      'Endoscopic ultrasound',
    ],

    management: [
      'Dietary changes: avoid fizzy drinks, cut fatty foods, avoid gas-causing foods',
      'Lifestyle changes: quit smoking, avoid chewing gum, regular exercise',
    ],

    whenToConsultDoctor:
      'Consult your doctor when medications don’t work and your symptoms get worse.',
  },

  'gingivitis': {
    title: "Gingivitis",

    description:
      "Gingivitis is the most common form of gum disease, making gums sore, red, and prone to bleeding upon brushing. It is reversible with good oral hygiene. If untreated, it progresses to periodontitis, affecting tooth-supporting bone and causing tooth loss.",

    causes:
      "Primarily caused by poor oral hygiene (no flossing, poor brushing) leading to plaque buildup. Other causes include hormonal changes (pregnancy), certain drugs (phenytoin, anti-hypertensives), and dental appliances trapping debris.",

    riskFactors: [
      'Dry mouth (e.g., Sjogren’s syndrome, mouth breathing from asthma)',
      'Malnutrition and old age',
      'Bacterial or fungal mouth infections',
      'Systemic diseases like Diabetes',
      'Cigarette smoking',
      'Trauma from hard-bristle toothbrushes',
      'Avoiding dental checkups',
    ],

    symptoms: [
      'Swollen, red (or purple in aggressive forms) gums',
      'Bleeding on brushing',
      'Bad breath and altered taste',
      'Pain on eating spicy or hot food',
      'Sore and tender gums to touch',
    ],

    diagnosis: [
      'Complete dental check-up by a Dentist',
      'Radiographs and probing pocket depths',
      'Checking for plaque and tartar/calculus deposits',
      'Medical history review to rule out systemic causes',
    ],

    management: [
      'Proper brushing TWICE a day with a soft-bristle or motorized toothbrush',
      'Religious flossing and use of interdental brushes',
      'Professional dental scaling at least once a year',
      'Antibacterial mouthwashes (chlorhexidine and peroxide)',
      'Topical anesthetic gels for sore gums',
    ],

    whenToConsultDoctor:
      'Visit a dentist for proper scaling if symptoms don’t improve with brushing/flossing. If teeth start getting loose, it requires immediate periodontal treatment.',
  },

  'glaucoma': {
    title: "Glaucoma",

    description:
      "Glaucoma is a term for a combination of disorders that damage the optic nerve, often driven by high fluid pressure inside the eyes. It is a leading cause of blindness, especially in older individuals.",

    causes:
      "Glaucoma is caused by the blockage of the eye's drainage channels, leading to fluid buildup and pressure. Secondary causes include eye injuries, severe eye infections, chemical injuries, or blocked blood vessels in the eye.",

    riskFactors: [
      'Age above 40',
      'Family history of glaucoma',
      'Existing eyesight/vision problems or thinning of the cornea',
      'Diabetes, high blood pressure, or heart disease',
      'Prolonged steroid use (e.g., prednisolone)',
      'Eye trauma',
    ],

    symptoms: [
      'Vision loss starting from the edges (often unnoticed at first)',
      'Redness in the eye',
      'Hazy appearance of the eyes',
      'Halos appearing around lights',
      'Eye pain',
      'Narrowed vision',
    ],

    diagnosis: [
      'Thorough medical and family history',
      'Comprehensive eye examination measuring intraocular pressure',
      'Laboratory investigations as needed',
    ],

    management: [
      'Prescription eye drops to lower pressure',
      'Oral medications',
      'Laser surgery or microsurgery to open drainage pathways',
    ],

    whenToConsultDoctor:
      'Consult a doctor if the condition worsens, there is no improvement, you experience side effects from medicines, notice visual disturbances, or feel general discomfort.',
  },

  'glossitis': {
    title: "Glossitis",

    description:
      "Glossitis refers to inflammation of the tongue, causing it to become swollen, change color, and develop a smooth surface. A specific type, 'geographic tongue', creates map-like patterns on the tongue's surface.",

    causes:
      "Causes include allergic reactions to food/dental products, dry mouth (Sjogren syndrome), infections (bacterial/viral/fungal), trauma from ill-fitting dental appliances, tobacco use, excessive hot/spicy foods, hormonal imbalances, and vitamin/mineral deficiencies.",

    riskFactors: [
      'Trauma to the mouth',
      'Intake of extremely spicy food',
      'Ill-fitting dental appliances causing continuous irritation',
      'Herpes simplex infection',
      'Low iron levels and nutritional deficiencies',
      'Food allergies and immunosuppression',
    ],

    symptoms: [
      'Sore, tender, and swollen tongue',
      'Trouble in mastication (chewing), swallowing, and speaking',
      'Smooth, red (erythema), or pale appearance of the tongue',
      'Obstruction of the airway (very rarely)',
    ],

    diagnosis: [
      'Thorough medical and dental history',
      'Close physical inspection of the mouth',
      'Laboratory investigations to rule out metabolic disorders or nutritional deficits',
    ],

    management: [
      'Antibiotics (if caused by bacterial infection)',
      'Multivitamins (if caused by nutritional deficiency)',
      'Good oral hygiene practices',
      'Avoiding irritants like spicy food, tobacco, and correcting ill-fitting dentures',
    ],

    whenToConsultDoctor:
      'Consult a doctor if the condition worsens, symptoms last longer than 10 days, or if trouble breathing, speaking, or chewing gets severe.',
  },

  'gout': {
    title: "Gout",

    description:
      "Gout is a form of arthritis associated with a metabolic disorder of purines. It is characterized by severe pain, swelling, and redness of joints (especially the big toe). It progresses through asymptomatic hyperuricemia, acute gout, and chronic gout, and attacks are recurring.",

    causes:
      "Gout is caused by high levels of uric acid crystallizing in joints. This buildup results from decreased excretion by the kidneys, diets rich in purines (steaks, seafood, beers), certain medicines (diuretics, aspirin, niacin), and genetic predispositions.",

    riskFactors: [
      'Increased weight',
      'Alcohol abuse',
      'Hypertension and Diabetes',
      'Hypothyroidism',
      'Recent surgery or trauma',
      'Family history of gout',
    ],

    symptoms: [
      'Tenderness, swelling, and redness of joints',
      'Compromised joint mobility',
      'Tophi (painless, crystal deposits)',
      'Fatigue and fever',
      'Kidney stones',
    ],

    diagnosis: [
      'Complete medical history of joint pain',
      'Joint fluid analysis for uric acid crystals',
      'Blood tests for uric acid levels',
      'X-Ray of joints',
    ],

    management: [
      'Pain killers and NSAIDs (like indomethacin)',
      'Colchicine to reduce inflammation',
      'Allopurinol or febuxostat to reduce uric acid production',
      'Lifestyle changes: drinking plenty of water, exercise, avoiding alcohol/beer, restricting seafood/meat',
    ],

    whenToConsultDoctor:
      'Attacks normally last 3-10 days. If prescribed medications are no longer effective in managing pain or inflammation, consult a doctor.',
  },

  'growth-hormone-deficiency': {
    title: "Growth Hormone Deficiency",

    description:
      "Growth Hormone Deficiency, commonly known as Dwarfism or Pituitary Dwarfism, is characterized by the release of insufficient amounts of growth hormone in the body.",

    causes:
      "Causes include severe head injuries, brain/pituitary tumors, serious infections, hormonal abnormalities, poor blood supply to the pituitary gland, and radiation (X-rays) to the brain.",

    riskFactors: [
      'Damaged pituitary gland or hypothalamus',
      'Severe disease or accident affecting the brain',
      'Brain tumor or surgery',
      'Decreased blood supply to the brain',
      'Frequent exposure to radiation',
    ],

    symptoms: [
      'Greater body fat, especially around the waist',
      'Less muscle mass and low bone density',
      'Decreased stamina and decreased libido',
      'Anxiety, depression, and feelings of isolation',
      'Greater heat or cold sensitivity',
      'Cholesterol level changes',
    ],

    diagnosis: [
      'Physical examination and symptom check',
      'Lab test checking growth hormone levels (drawing blood after 10-12 hours of fasting and stimulating the pituitary gland)',
    ],

    management: [
      'Regular synthetic growth hormone injections',
      'Dietary and lifestyle changes (regular exercise)',
      'Medicines to manage associated hormonal imbalances',
    ],

    whenToConsultDoctor:
      'See a doctor if you experience short stature without apparent cause, abnormal body fat distribution, or delayed/reduced growth in height and bone.',
  },

  'haemophilia-a': {
    title: "Haemophilia A",

    description:
      "Haemophilia A is a genetic bleeding disorder where blood is unable to clot easily due to a lack of clotting factor VIII. It is an X-linked hereditary disease more common in males, causing excessive internal/external bleeding from minor injuries.",

    causes:
      "It is a genetic disorder caused by either inheriting the defective gene from parents or from a spontaneous gene mutation.",

    riskFactors: [
      'Family history of Haemophilia',
      'Male sex',
      'Certain drugs or autoimmune disorders',
    ],

    symptoms: [
      'Frequent and excessive bleeding',
      'High tendency for bruising',
      'Joint pain (from internal bleeding)',
      'Bleeding nose',
      'Blood in urine and stools',
    ],

    diagnosis: [
      'Medical and family history review',
      'Blood tests analyzing clotting time and factor VIII deficiency',
    ],

    management: [
      'Infusion of clotting factors',
      'Desmopressin',
      'Antifibrinolytic drugs (to slow breakdown of clots)',
      'Extreme caution handling injuries and taking safety measures',
    ],

    whenToConsultDoctor:
      'Consult your doctor immediately in case of excessive bleeding, repetitive vomiting, severe headache, neck pain, or blurred vision.',
  },

  'headache': {
    title: "Headache",

    description:
      "Headache is pain in the head or face of varying natures. Primary headaches (cluster, tension, migraine) are not caused by other medical conditions, whereas secondary headaches are symptoms of underlying medical issues.",

    causes:
      "Causes include family history, environmental triggers (smoke, sharp smells, noise, stress, pollution, allergens), sinusitis, and secondary infections (throat and ear infections).",

    riskFactors: [
      'Insomnia',
      'Stress and depression',
      'Changes in weather',
      'Alcohol abuse',
      'Exposure to triggers like noise or pollution',
    ],

    symptoms: [
      'Pain in the head or face (gradual or sudden onset)',
      'Throbbing, sharp, or dull pain of variable intensity and duration',
    ],

    diagnosis: [
      'Complete medical history and physical examination',
      'Lab tests or imaging to rule out serious secondary causes',
    ],

    management: [
      'Pain relieving medicines for mild headaches',
      'Preventive medicines to avoid migraines',
      'Treating the underlying cause (for secondary headaches)',
      'Alternative treatments like meditation and acupuncture',
    ],

    whenToConsultDoctor:
      'Consult your doctor if you have a persistent or worsening headache that doesn’t get better with medicines, or if the headache is triggered by coughing and exertion.',
  },

  'heart-attack': {
    title: "Heart Attack",

    description:
      "A Heart attack (myocardial infarction) is a life-threatening emergency where compromised blood flow to the heart results in irreversible tissue damage. It is typically caused by blocked arteries.",

    causes:
      "Most commonly caused by atherosclerosis (coronary artery disease), where fats/cholesterol deposit on artery walls. Other causes include coronary artery spasms (contraction restricting blood flow) and coronary artery dissections (tears in the artery).",

    riskFactors: [
      'Hypertension (high blood pressure) and Hypercholesterolemia',
      'Smoking',
      'Obesity and Diabetes',
      'Old age',
      'Family history of heart attacks',
    ],

    symptoms: [
      'Severe pressure or squeezing sensation in the chest or arms (can spread to neck, jaw, or back)',
      'Difficulty in breathing',
      'Lightheadedness or dizziness',
      'Exhaustion',
      'Excessive cold sweat',
      'Rapid or irregular heartbeat',
    ],

    diagnosis: [
      'ECG to check the heart\'s electrical activity',
      'Blood tests identifying heart proteins/enzymes released post-damage',
      'Chest X-ray and Echocardiogram',
    ],

    management: [
      'Emergency medicines: Aspirin, anti-platelets (clopidogrel), nitroglycerin, thrombolytics, painkillers',
      'Surgery: Angioplasty, Stenting, or Bypass surgery',
      'Post-attack lifestyle changes: strict healthy diet, regular exercise, weight control, and avoiding smoking/alcohol/stress',
    ],

    whenToConsultDoctor:
      'Heart attacks are an emergency. Call an ambulance immediately if you experience any symptoms. Post-care must be managed by a cardiologist.',
  },

  'heart-failure': {
    title: "Heart Failure",

    description:
      "Heart Failure (Congestive Heart Failure) is characterized by reduced efficiency of the heart muscle to pump blood around the body. It gradually decreases the heart’s ability to function effectively.",

    causes:
      "Causes include Coronary Artery Disease, Hypertension, cardiomyopathy, congenital heart defects, heart valve disease, arrhythmias, emphysema, diabetes, thyroid disorders, severe anemia, cancer/chemotherapy, and drug/alcohol abuse.",

    riskFactors: [
      'Obesity and Diabetes',
      'Excessive consumption of fatty foods (Atherosclerosis)',
      'Unhealthy lifestyle, smoking, and stress',
      'Pancreatitis',
      'Elderly age',
    ],

    symptoms: [
      'Dyspnea (shortness of breath)',
      'Fatigue or weakness',
      'Swelling in the legs, ankles, feet, and weight gain',
      'Irregular heartbeat',
      'Wheezing, persistent cough, or sudden severe coughing',
      'Increased urination at night',
      'Lack of appetite and decreased alertness',
      'Chest pain and feeling of suffocation',
    ],

    diagnosis: [
      'Chest X-ray',
      'Electrocardiogram (ECG)',
      'Stress tests (evaluating heart under exertion)',
      'Cardiac CT scan and Cardiac MRI',
    ],

    management: [
      'Regular use of prescribed medicines',
      'Light to mild exercise',
      'Cessation of smoking and alcohol',
      'Reduction of dietary sodium and cholesterol',
      'Maintaining a healthy lifestyle',
    ],

    whenToConsultDoctor:
      'If symptoms do not improve within 10 days, or you experience chest pain, fainting, extreme weakness, or breathlessness, see a doctor immediately.',
  },

  'herpes': {
    title: "Herpes",

    description:
      "Herpes (Herpes simplex) is a viral infection causing lesions on the mouth, lips, genitals, eyes, or skin. HSV-1 primarily causes cold sores around the mouth, while HSV-2 causes genital sores and is sexually transmitted. The first episode is usually severe, with recurrences becoming milder.",

    causes:
      "Caused by the Herpes Simplex Virus. HSV-1 usually infects the mouth/lips, while HSV-2 infects the genitals. It is transmitted via direct body contact or contact with infected fluids (kissing, intercourse).",

    riskFactors: [
      'Female gender',
      'Unprotected sex or having multiple sex partners',
      'Transmission from infected mother to infant during childbirth',
      'Weak immune system',
    ],

    symptoms: [
      'Oral: Cold sores/blisters around mouth/lips, pain/itching, fever, tiredness, muscle pain',
      'Genital: Sores/blisters around rectum/buttocks/thighs, itching, burning, tingling',
      'Chickenpox/Shingles variant: Itchy red rash spreading over body, or localized burning/shooting pain with blisters',
    ],

    diagnosis: [
      'Physical examination of the sores',
      'Viral culture (sampling fluid from the lesion)',
      'Antibody blood test',
      'Skin biopsy',
    ],

    management: [
      'Anti-viral medicines (acyclovir, valaciclovir) to decrease outbreak frequency',
      'Analgesics (ibuprofen, paracetamol) for pain and fever',
      'Topical anesthetics (prilocaine, lidocaine, tetracaine) for itching/pain',
    ],

    whenToConsultDoctor:
      'Consult your doctor immediately if you have symptoms of an eye infection, throat infection, erythema multiforme (immune reaction causing target lesions), or if your condition worsens.',
  },

  'hepatitis-c': {
    title: "Hepatitis C",

    description:
      "Hepatitis C is a contagious blood-borne viral infection of the liver caused by the HCV virus. It progresses from acute to chronic stages, eventually leading to cirrhosis and liver cancer. Unlike Hepatitis A and B, there is no vaccine.",

    causes:
      "Caused by the Hepatitis C Virus entering the bloodstream through shared injection needles, sexual intercourse, accidental needle sticks, mother-to-child birth transmission, or sharing contaminated items like razors/tattoo equipment.",

    riskFactors: [
      'Receiving blood transfusions/organ transplants before July 1992',
      'Injecting or inhaling drugs',
      'Being born between 1945 and 1965',
      'Long-term kidney dialysis',
      'HIV infection',
      'Being born to a Hepatitis C infected mother',
      'Having been in prison',
    ],

    symptoms: [
      'Often asymptomatic initially',
      'Gallstones and Kidney failure',
      'Encephalopathy (brain doesn’t work well)',
      'Easy bleeding and bruising',
      'Muscle loss and weight loss',
      'Fluid buildup in legs or abdomen',
      'Spider-like veins on the skin',
      'Esophageal varices (vomiting blood)',
    ],

    diagnosis: [
      'Checking blood for anti-HCV antibodies',
      'HCV RNA testing (measures viral genetic material)',
      'Liver function tests to measure protein and enzyme levels',
    ],

    management: [
      'Acute infections may clear naturally, but chronic requires treatment',
      'Pan-genotypic direct-acting antivirals (DAAs) can cure most HCV infections',
    ],

    whenToConsultDoctor:
      'Consult a doctor immediately if you experience the symptoms or suspect exposure. Early diagnosis prevents progression to chronic disease.',
  },

  'hepatitis-b': {
    title: "Hepatitis B",

    description:
      "Hepatitis B is a viral liver infection causing both acute and chronic diseases, transmitted via blood and body fluids. It is a life-threatening global health issue, though a highly effective vaccine exists to prevent infection and subsequent chronic liver disease/cancer.",

    causes:
      "Caused by the HBV virus. Transmission occurs through sexual contact, blood transfusions, sharing contaminated needles/syringes, and vertical transmission from mother to child during childbirth.",

    riskFactors: [
      'Unprotected sex with an infected partner',
      'Sharing needles or accidental needle sticks',
      'Being born to an infected mother',
      'Occupational exposure to human blood',
      'Traveling to regions with high infection rates',
    ],

    symptoms: [
      'Often asymptomatic',
      'Jaundice (yellowish discoloration of skin and eyes)',
      'Fever, nausea, reduced appetite, and vomiting',
      'Pale stools and dark colored urine',
      'Fatigue and flu-like symptoms',
    ],

    diagnosis: [
      'Physical examination',
      'Blood tests',
      'Liver ultrasound (transient elastography to assess damage)',
      'Liver biopsy',
    ],

    management: [
      'Immediate post-exposure vaccine and Hepatitis B immune globulin shot',
      'Avoiding unnecessary liver-taxing medications like acetaminophen',
      'Eating a healthy diet',
      'Prescription antivirals for chronic cases',
      'Liver transplant in cases of severe cirrhosis',
    ],

    whenToConsultDoctor:
      'Get screened if you are pregnant, born in an endemic country, unvaccinated, HIV-positive, a man having sex with men, injecting drugs, or living with an infected person.',
  },
  'heartburn': {
    title: "Heartburn",

    description:
      "Heartburn is a burning sensation in your chest and throat due to regurgitation of stomach acid. It is very common and almost everyone experiences it as some point in their lives. If reflux of stomach acid occurs more than twice a week, it is called GERD (gastroesophageal reflux disease). The stomach lining is protected from acid, but acid in the esophagus may cause damage and inflammation. Heartburn is also associated with a bitter or acidic taste in the mouth. Despite the name, heartburn has nothing to do with the heart.",

    causes:
      "Heartburn is basically due to acid reflux from the stomach. It can happen when there is increased production of acid or abnormal activity of the gastroesophageal sphincter (the valve that stops acid from entering the esophagus). Common causes include diet (spices, high fat foods, citrus fruits, onion, coffee, and milk), obesity (increased abdominal pressure), medicines (Aspirin, naproxen, ibuprofen), and smoking (decreases sphincter function).",

    riskFactors: [
      'Increased weight',
      'Hiatus hernia',
      'Pregnancy',
      'Lying down after eating',
      'Eating large meals late at night',
    ],

    symptoms: [
      'Burning sensation in chest and throat',
      'Acidic taste in mouth',
      'Worsening of pain on bending or lying down',
      'Bad breath',
      'Cough and hoarseness',
      'Tooth erosions',
    ],

    diagnosis: [
      'Complete medical history and simple physical exam',
      'X-ray of the esophagus and stomach',
      'Endoscopy (procedure to look inside the body with a thin tube)',
      'Acid monitoring',
    ],

    management: [
      'Lifestyle modifications: avoid trigger foods, large meals, alcohol, smoking, and late-night meals; reduce weight; avoid lying down after eating',
      'Heartburn medicines: Antacids, proton-pump inhibitors, and Histamine H2 agonists',
      'Heartburn surgery: Fundoplication (wraps a part of the stomach around the esophagus to work as a valve)',
    ],

    whenToConsultDoctor:
      "A doctor should be consulted if there is no improvement even after taking the prescribed medication, or if the disease has progressed to the extent where there is severe inflammation in the food pipe or difficulty swallowing (dysphagia).",
  },

  'hiatus-hernia': {
    title: "Hiatus Hernia",

    description:
      "A hiatus hernia is an abnormal exit of the upper stomach into the chest cavity through a weakness or tear in the diaphragm. The hiatus is a normal opening in the diaphragm for the esophagus. If it is abnormally large, the upper stomach may slip into the chest cavity. Types include Sliding hiatal hernia (most common, stomach slips up and back down) and Fixed or paraesophageal hernia (protrusion remains in the chest cavity at all times, which is rare but serious).",

    causes:
      "Exact causes are not fully discovered, but contributing factors include increased abdominal pressure (weight lifting, pregnancy, obesity, hard sneezing, constipation), age changes in the diaphragm (weakens with age), trauma or injury to the diaphragm, or being born with an abnormally large hiatal opening (congenital).",

    riskFactors: [
      'Female gender',
      'Old age (people older than 50 years of age)',
      'Obesity (increases abdominal pressure)',
      'Smoking',
    ],

    symptoms: [
      'Acidity and a bitter taste in the mouth after a burp',
      'Heaviness and pain in the abdomen',
      'Feeling bloated after a meal (frequent burps and farts)',
      'Difficulty in swallowing and bad breath',
      'Breathing problems due to pressure on the chest',
      'In severe cases, vomiting and sharp pain in the abdomen (indicating hernia blockage)',
    ],

    diagnosis: [
      'Endoscopy (a visual of the stomach and specifically hernia)',
      'Barium meal swallow (a special kind of X-ray to see the stomach)',
      'pH tests to measure acidity of the stomach',
      'Pressure tests (manometry) to check the muscle strength and activity of the esophagus',
    ],

    management: [
      'Lifestyle modifications: avoid trigger foods, large/fatty meals, and lying down after eating; exercise regularly; quit smoking',
      'Medicines: Antacids, Proton pump inhibitors, Histamine H2 agonists',
      'Surgical management: required for fixed hiatal hernias due to the risk of stomach strangulation',
    ],

    whenToConsultDoctor:
      "Consult a doctor if complications arise, such as bloody vomiting (could be cancer/infection), inability to pass stool (suggests blockage), or chest tightness (could be angina or heart attack).",
  },

  'high-blood-pressure': {
    title: "High Blood Pressure",

    description:
      "High blood pressure, also known as hypertension, is an abnormal condition characterized by a rise in blood pressure. Normally, reading is 120/80 mm Hg. When it rises to 130/80 mm Hg or higher, it is considered high blood pressure. Consistently high blood pressure increases the risk of brain and kidney disease.",

    causes:
      "The main cause may be undetermined or include genetic/family history, obesity, concomitant conditions, high cholesterol, high dietary salt intake, diabetes, hormone problems, kidney disease, or thyroid disorders.",

    riskFactors: [
      'Genetic history',
      'Obesity',
      'Stress',
      'Smoking',
      'Old age',
      'Excessive alcohol intake',
      'Unhealthy lifestyle',
      'Sleep disorders',
    ],

    symptoms: [
      'Severe and/or frequent headaches',
      'Fatigue',
      'Blurred vision',
      'Chest pain',
      'Difficulty breathing',
      'Irregular heartbeats',
      'Urine changes',
    ],

    diagnosis: [
      'Physical examination and check of relevant symptoms',
      'Lab tests',
      'Blood pressure readings checked on two or more different occasions for an accurate diagnosis',
    ],

    management: [
      'Regular and directed use of prescribed medicines',
      'Light exercise and a healthy diet',
      'Development of healthy habits',
      'Minimal or no consumption of alcohol',
      'Cessation of smoking',
      'Minimal use of caffeine and dietary salt',
      'Stress reduction',
    ],

    whenToConsultDoctor:
      "Early diagnosis can lead to effective treatment. If your symptoms do not improve within a few days, or you experience an increased heartbeat or dizziness, please see a doctor.",
  },

  'hiv-infections': {
    title: "HIV Infections",

    description:
      "HIV (human immunodeficiency virus) is a virus that infects the human immune system, making individuals more prone to serious infections and certain cancers. It may lead to AIDS (acquired immunodeficiency syndrome), the final stage of HIV infection, though not everyone with HIV develops AIDS.",

    causes:
      "HIV is transmitted through unprotected sex with an infected person, joint use of syringes/needles, non-sterile skin piercing/tattooing instruments, sharing razors/toothbrushes with blood residue, contact with infected blood, from HIV-positive mothers to babies (during pregnancy, birth, breastfeeding), and unscreened blood transfusions.",

    riskFactors: [
      'Unprotected sexual contact with an infected person',
      'Sharing needles or injection systems',
      'Receiving unscreened blood transfusions or organ transplants',
      'Infants born to HIV-positive mothers',
    ],

    symptoms: [
      'Acute HIV: Headache, fever, muscle aches, sore throat, painful mouth sores, diarrhea, cough, weight loss, night sweats',
      'Symptomatic HIV Infection: Fatigue, oral yeast infection, shingles, pneumonia, swollen lymph nodes, weight loss, diarrhea',
    ],

    diagnosis: [
      'Complete medical history (inquiring about travel, transplants, sexual relationships, unscreened blood transfusions)',
      'ELISA blood test (to check for antibodies made against the HIV virus)',
      'Western blot test (confirmatory test done after a positive ELISA)',
    ],

    management: [
      'There is no cure, but antiretroviral medicines fight the infection and lower the risk of infecting others',
      'Early treatment allows people to live with the disease for a long time',
    ],

    whenToConsultDoctor:
      "If you suspect that you may have come in contact with the virus, consult a doctor right away; the earlier the treatment, the better.",
  },

  'hydatid-disease': {
    title: "Hydatid Disease",

    description:
      "Hydatid cyst or echinococcosis is a zoonotic infectious disease caused by parasites of the genus echinococcus (E. granulosus and E. multilocularis). The infection is spread through eggs transmitted from dogs, foxes, wolves, and other canines. It has two types: Cystic echinococcosis and Alveolar echinococcosis.",

    causes:
      "Caused by eating undercooked meat of sheep, cow, and goat that has grazed on grass polluted with dog feces, or hand-to-mouth route after patting an infected dog and eating with unwashed hands. There is no human-to-human transmission.",

    riskFactors: [
      'Having a pet dog that is infected',
      'Eating out and eating from unhygienic places',
      'Eating without proper hand washing',
    ],

    symptoms: [
      'Liver cysts cause stomachache, enlarged tummy, vomiting, diarrhea, jaundice, loss of appetite, weight loss, and in extreme cases, bloody vomiting',
      'Lung (and rarely heart) invasion causes cough, chest heaviness, chest pain, and blood in spit if cysts burst',
      'Complications: organ failure or systemic infections from burst cysts',
    ],

    diagnosis: [
      'Blood, urine, and stool tests when a burst cyst is suspected',
      'X-rays, ultrasounds, CT scans, and MRI for visualizing cysts in organs',
      'Microscopic test on a specimen of cyst fluid',
    ],

    management: [
      'Surgical management: the treatment of choice for easily removable cysts',
      'Pharmacological management: Mebendazole, Albendazole, and Praziquantel for inoperable cysts',
      'PAIR (Puncture, aspiration, injection, and re-aspiration): used for multiple cysts, daughter cysts, or post-surgical relapse',
    ],

    whenToConsultDoctor:
      "An extremely painful condition with frequent vomiting and blood in the stool is an alarm signal. Rush to a doctor immediately for tests and medical care.",
  },

  'human-metapneumovirus': {
    title: "Human Metapneumovirus",

    description:
      "The Human Metapneumovirus (hMPV) is a viral infection that affects the respiratory tract. It can present itself in the form of mild cold-like symptoms or as a severe respiratory infection.",

    causes:
      "Caused by inhaling respiratory droplets from an infected individual coughing or sneezing, touching an infected person (e.g., shaking hands) and then touching the mouth/nose/eyes, or touching contaminated objects/surfaces and then touching the face.",

    riskFactors: [
      'Young children and infants',
      'Adults with chronic medical conditions',
      'Individuals with a weak immune system',
      'Individuals with respiratory conditions like asthma or COPD',
    ],

    symptoms: [
      'Cough',
      'Nasal congestion or runny nose',
      'Sore throat',
      'Fever',
      'Difficulty breathing and wheezing',
      'Fatigue',
      'Chest pain',
    ],

    diagnosis: [
      'Molecular test like PCR to detect the virus\'s genetic material',
      'Antigen test to identify viral proteins in the respiratory system',
    ],

    management: [
      'No specific antiviral treatment exists; management is symptomatic',
      'Maintaining hydration',
      'Over-the-counter medications to alleviate fever and pain',
      'Oxygen therapy in severe cases',
      'Hospitalization for severe respiratory distress or complications',
    ],

    whenToConsultDoctor:
      "Consult a doctor if symptoms of respiratory distress arise, particularly in high-risk groups like infants, the elderly, or immunocompromised individuals.",
  },

  'hodgkins-lymphoma': {
    title: "Hodgkin's Lymphoma",

    description:
      "Hodgkin’s Lymphoma is a cancerous condition originating from the body’s white blood cells, particularly lymphocytes. During the course of the disease, non-tender swollen lymph nodes may appear in the neck, under the arms, or in the groin area.",

    causes:
      "The exact cause is unknown. However, research suggests it occurs due to a DNA mutation in B lymphocytes, causing them to grow and multiply rapidly.",

    riskFactors: [
      'Genetic or family history',
      'Frequent exposure to radiation or carcinogens',
      'Weak immune system',
      'Epstein Barr Virus (infectious virus)',
      'Human-Immunodeficiency Virus (HIV)',
      'Age (increased occurrence in individuals in their 20s or above 55 years of age)',
    ],

    symptoms: [
      'Painless swelled lymph nodes',
      'Persistent fatigue',
      'Night sweats',
      'Unexplained weight loss',
      'Fever',
      'Severe itching',
      'Appetite changes',
      'Increased sensitivity to alcohol',
    ],

    diagnosis: [
      'Physical examination and symptom check',
      'Biopsy of lymph nodes',
      'Imaging tests',
      'Blood tests',
    ],

    management: [
      'Regular and directed use of prescribed medicines',
      'Radiation therapy',
      'Chemotherapy',
      'Steroids',
    ],

    whenToConsultDoctor:
      "Early diagnosis can lead to effective treatment. If you experience persistent fatigue and swollen lymph nodes, please see a doctor immediately. Failure to do so may prove to be fatal.",
  },

  'hypercalcemia': {
    title: "Hypercalcemia",

    description:
      "Hypercalcemia is a condition in which the calcium level in your blood is above the normal level. Too much calcium weakens your bones and can create kidney stones. It is often a result of overactive parathyroid glands.",

    causes:
      "Causes include overactive parathyroid glands, cancer, various medical disorders, certain medications, and taking too much calcium and Vitamin D supplements.",

    riskFactors: [
      'Age group 50-60 years',
      'Post menopausal women',
      'Family history of hyperparathyroidism',
    ],

    symptoms: [
      'Digestive system: Stomach upset, nausea, constipation, and vomiting',
      'Kidneys: Excess calcium makes kidneys work harder, potentially causing stones',
      'Brain: Slow function resulting in confusion, fatigue, lethargy, and depression',
      'Heart: Palpitations and fainting',
      'Bones and muscles: Bone pain and muscle weakness',
    ],

    diagnosis: [
      'Blood tests to diagnose high calcium levels and to check if the parathyroid hormone is elevated',
    ],

    management: [
      'Treatment depends on the severity and underlying cause (e.g., addressing hyperparathyroidism or adjusting supplements)',
      'Hydration and medications to lower calcium levels in severe cases',
    ],

    whenToConsultDoctor:
      "Consult your doctor when you notice signs and symptoms of hypercalcemia.",
  },

  'hyperlipidemia': {
    title: "Hyperlipidemia",

    description:
      "Hyperlipidemia (or hyperlipoproteinemia) is an abnormally increased level of lipoproteins or lipids (cholesterol and triglycerides) in the blood. LDL is 'bad' cholesterol that deposits fat in arteries, while HDL is 'good' cholesterol that carries fat to the liver. It is a major risk factor for heart disease.",

    causes:
      "Primary hyperlipidemia is caused by genetic abnormalities and runs in families. Secondary hyperlipidemia is acquired through diets rich in cholesterol/fats, sedentary lifestyles, certain medicines (thiazides, beta-blockers, estrogen), hypothyroidism, pregnancy, kidney disease, or alcohol abuse.",

    riskFactors: [
      'Preventable: Smoking, alcohol, unhealthy diets (full-fat dairy, meat, processed food), sedentary lifestyle',
      'Non-preventable: Hypertension, diabetes, hypothyroidism, polycystic ovarian disease, pregnancy',
    ],

    symptoms: [
      'Usually asymptomatic but puts you at risk for other illnesses',
      'High blood pressure (narrowing of arteries)',
      'Heart attacks or strokes (from fat build-up and blood clots)',
      'Diabetes',
      'Xanthelasma (rarely, fat deposits around the eyes)',
    ],

    diagnosis: [
      'Complete medical history and physical exam',
      'Lipid profile blood test (measuring LDL, HDL, total cholesterol, and triglycerides)',
    ],

    management: [
      'Lifestyle modifications: strict diet, avoid alcohol, quit smoking, daily exercise',
      'Statins (lipid-lowering medicines like Atorvastatin, rosuvastatin)',
      'Cholestyramine and colestipol',
      'Gemfibrozil, fenoglide, and triglide',
      'Niacin and Ezetimibe',
    ],

    whenToConsultDoctor:
      "A medical professional should be consulted right away if one feels a sudden chest pain, shortness of breath, dizziness, numbness, slurred speech, or difficulty in walking.",
  },

  'hyperpigmentation': {
    title: "Hyperpigmentation",

    description:
      "Hyperpigmentation refers to dark patches or uneven skin tone. It commonly appears on the face, neck, elbows, hands, and sun-exposed areas. It affects dark-skinned people more commonly and can result from an underlying disease or skin disorder.",

    causes:
      "Caused by excess production of melanin. Reasons include excessive sun/UV exposure, aging, Addison’s disease (elevated MSH hormones), post-inflammatory responses (acne or injury), Acanthosis Nigricans (insulin resistance), Hemochromatosis (excessive iron storage), and certain drugs (chemo, antibiotics, anti-malaria).",

    riskFactors: [
      'Darker skin tones',
      'Prolonged sun exposure',
      'Insulin resistance or endocrine disorders',
      'Use of certain medications',
    ],

    symptoms: [
      'Dark Spots',
      'Sunspots or Age Spots',
      'Melasma (patchy, symmetrical discoloration on face, common during/post-pregnancy)',
    ],

    diagnosis: [
      'Clinical examination by a dermatologist',
      'Detailed history taking',
      'Examination under a Wood\'s lamp',
    ],

    management: [
      'Prevention via strict sun protection and avoiding unnecessary sun exposure',
      'Medications such as Hydroquinone',
      'Chemical peels',
      'Laser treatments',
      'Treating the underlying disease or disorder',
    ],

    whenToConsultDoctor:
      "If you’re experiencing the above-mentioned signs which are increasing with time, consult a doctor, preferably a dermatologist.",
  },

  'hypocalcemia': {
    title: "Hypocalcemia",

    description:
      "Hypocalcemia is a condition characterized by lower-than-normal levels of calcium in the blood. It can be a manifestation of an underlying disease or occur on its own, affecting a person in multiple ways and proving lethal if neglected.",

    causes:
      "Causes include poor prolonged calcium intake, medicines interfering with absorption, dietary intolerance to calcium-rich foods, hormonal imbalance, genetic factors, hypoparathyroidism, Vitamin D or Magnesium deficiency, chronic liver disease, pancreatitis, stress/anxiety, and diabetic mothers (in infants).",

    riskFactors: [
      'Vitamin D or Magnesium deficiency',
      'History of gastrointestinal disorders',
      'Pancreatitis',
      'Renal (kidney) or hepatic (liver) failure',
      'Anxiety or Malnutrition',
      'Newborn babies (especially from diabetic mothers)',
      'Massive blood transfusions',
    ],

    symptoms: [
      'Muscle stiffness and spasms',
      'Paresthesia (abnormal skin sensations)',
      'Mood changes, anxiety, irritability, and memory issues',
      'Hypotension (low blood pressure)',
      'Difficulty speaking and swallowing',
      'Fatigue and Parkinsonism (movement abnormalities)',
      'Papilledema (swelling of optic nerve) and Arrhythmias',
      'Dry skin and brittle nails',
    ],

    diagnosis: [
      'Medical, family, and dietary history',
      'Blood tests to identify the causative agent',
      'Symptom assessment (duration, intensity, location)',
    ],

    management: [
      'Increasing dietary intake of calcium-rich foods and drinks',
      'Calcium supplements (calcium carbonate, calcium citrate, calcium phosphate)',
      'Treating the underlying deficiency or condition',
    ],

    whenToConsultDoctor:
      "Consult a doctor if your condition worsens, does not improve, frequency/intensity of symptoms increases, new side effects occur, or there is a general feeling of weakness/discomfort.",
  },

  'hyperthyroidism': {
    title: "Hyperthyroidism",

    description:
      "Hyperthyroidism occurs when the thyroid gland produces an excess of thyroid hormones, which accelerates the body’s metabolism and leads to rapid weight loss and other systemic effects.",

    causes:
      "Known causes include Grave’s disease (autoimmune), hyperfunctioning thyroid nodules (adenomas), thyroiditis, excess iodine, tumors of the ovaries/testes, benign pituitary/thyroid tumors, and excessive T3 intake via supplements.",

    riskFactors: [
      'Female gender',
      'Age above 60',
      'Recent pregnancy',
      'Autoimmune diseases like type 1 diabetes',
      'Family history of thyroid/autoimmune disease',
      'History of goiter',
      'High dietary iodine intake',
    ],

    symptoms: [
      'Rapid weight loss despite a good diet',
      'Tachycardia, arrhythmias, and palpitations',
      'Increased appetite',
      'Nervousness, irritability, and tremors',
      'Sweating and increased sensitivity to heat',
      'Disturbed menstrual cycles',
      'Frequent bowel movements',
      'Fatigue, muscle weakness, and trouble sleeping',
      'Thinning of skin and brittle hair texture',
    ],

    diagnosis: [
      'Thorough medical and family history',
      'Detailed neck examination',
      'Laboratory tests: TSH level, radioiodine uptake test',
      'Thyroid scan and thyroid ultrasound',
      'Vital sign assessment (blood pressure, pulse, weight)',
    ],

    management: [
      'First line: Antithyroid medicines to reduce hormone production',
      'Second line: Radioactive iodine to destroy hyperactive cells',
      'Surgery: Thyroidectomy to remove hyperfunctioning sections (usually for tumors)',
    ],

    whenToConsultDoctor:
      "Consult a doctor if your condition worsens, does not improve, you experience medication side effects, feel fatigued, or if neck swelling causes breathing difficulty.",
  },

  'hypertension': {
    title: "Hypertension",

    description:
      "Hypertension is a common disease where the blood pressure in arteries is so high that the heart must work harder than normal. It has two types: Primary (essential) hypertension with no identifiable cause, and Secondary hypertension associated with an underlying disease.",

    causes:
      "Most common causes include smoking, obesity, sedentary lifestyle, high-salt diet, old age, family history, alcohol abuse, and chronic kidney disease.",

    riskFactors: [
      'Family history of hypertension',
      'Diabetes',
      'Constant stress',
      'Sedentary lifestyle',
      'Age (females >65, males >55)',
      'Diets rich in salt',
    ],

    symptoms: [
      'Usually asymptomatic',
      'Headaches',
      'Epistaxis (nose bleeds)',
      'Visual disturbances',
      'Chest pain',
      'Hematuria (blood in urine)',
      'Fatigue',
    ],

    diagnosis: [
      'Complete medical history',
      'Regular blood pressure monitoring',
      'Lab tests to find underlying causes for secondary hypertension',
    ],

    management: [
      'Lifestyle modifications: strict diet, quit smoking, daily physical activity',
      'Medicines: take exactly as prescribed by a doctor',
    ],

    whenToConsultDoctor:
      "Consult your doctor if the condition persists/worsens, or if you experience symptoms of a heart attack/stroke, headaches, nose bleeds, dizziness, or fatigue.",
  },

  'hyperprolactinemia': {
    title: "Hyperprolactinemia",

    description:
      "Hyperprolactinemia is a condition in which the pituitary gland produces abnormally high levels of the hormone prolactin. While normal in pregnancy/lactation, it can cause reproductive disorders in non-pregnant individuals by influencing sex hormones like estrogen and testosterone.",

    causes:
      "Causes include physiologic triggers (pregnancy, lactation, stress, chest wall stimulation), hypothalamus-pituitary stalk damage (tumors, trauma, irradiation), pituitary hypersecretion (prolactinoma tumors, acromegaly), systemic disorders (chronic kidney failure, hypothyroidism, cirrhosis), and medicine-induced hypersecretion (dopamine blockers, opiates, antidepressants).",

    riskFactors: [
      'Radiation therapy',
      'Prolonged intake of medicines and drugs (alcohol, marijuana, antipsychotics)',
      'Pregnancy',
      'Thyroid gland failure',
    ],

    symptoms: [
      'Females: Infertility, irregular/changed menstrual cycles, early menopause, galactorrhea (abnormal milk production), breast pain, vaginal dryness',
      'Males: Gynecomastia (breast growth), galactorrhea, infertility, erectile dysfunction, loss of sexual desire',
      'General: Headaches, changes in vision',
    ],

    diagnosis: [
      'Thorough medical and menstrual history',
      'Blood tests to measure prolactin levels',
      'CT scan or MRI to check for pituitary tumors if prolactin is high',
    ],

    management: [
      'Treatment targets the underlying cause',
      'Tumor removal surgery (if applicable)',
      'Synthetic thyroid hormones (for thyroid failure)',
      'Medications like bromocriptine to lower prolactin levels',
    ],

    whenToConsultDoctor:
      "Consult a doctor if symptoms worsen, don't improve, new side effects appear, or if the condition causes physical/emotional distress.",
  },

  'hypogonadism': {
    title: "Hypogonadism",

    description:
      "Hypogonadism is a condition characterized by reduced or absent formation of sex hormones (testosterone or estrogen) due to decreased activity of the gonads (testes/ovaries). It can be Primary (dysfunction of gonads) or Secondary/Central (problem in the brain's signaling).",

    causes:
      "Causes include autoimmune disorders (Addison’s disease), genetic disorders (Klinefelter/Turner Syndrome), hemochromatosis, liver/kidney diseases, severe infections (mumps, HIV), sexual organ surgery, radiation, undescended testes, and brain/inflammatory disorders.",

    riskFactors: [
      'Genetic or family history of hypogonadism or brain diseases',
      'Obesity and sudden weight changes',
      'Steroid usage',
      'Frequent exposure to radiation',
      'Nutritional deficiencies',
    ],

    symptoms: [
      'Females: Amenorrhea (absence of periods), absent/retarded breast growth, hot flashes, body hair loss, reduced sex drive, milky breast discharge',
      'Males: Small testes/penis, gynecomastia, loss of body hair, muscle loss, erectile dysfunction, infertility, reduced sex drive',
      'General: Fatigue, hot flashes, difficulty concentrating',
    ],

    diagnosis: [
      'Physical examination and symptom check',
      'Blood tests for Follicle-Stimulating Hormone, Luteinizing Hormone, estrogen, and testosterone levels',
      'Tests for sperm count, prolactin levels, and iron levels',
    ],

    management: [
      'Females: Estrogen/Progesterone therapy, hCG, FSH, surgery, radiation',
      'Males: Testosterone therapy, Gonadotropin-releasing hormone, surgery, radiation',
    ],

    whenToConsultDoctor:
      "Early diagnosis leads to effective treatment. If you experience the above symptoms, please see a doctor.",
  },

  'hypothyroidism': {
    title: "Hypothyroidism",

    description:
      "Hypothyroidism (underactive thyroid) occurs when there is not enough thyroid hormone in the body. This hormone regulates metabolism, heart function, bones, and cholesterol. Untreated, it can cause joint pain, obesity, heart disease, and infertility.",

    causes:
      "Causes include thyroiditis (inflammation), Hashimoto’s thyroiditis (autoimmune), viral infections, certain medications (lithium, interleukin-2), radiation therapy side effects, dietary iodine deficiency, pituitary/hypothalamus disorders, and pregnancy-induced inflammation.",

    riskFactors: [
      'Asian or Caucasian descent',
      'Bipolar disorder, Down Syndrome, or Turner syndrome',
      'Presence of other autoimmune disorders',
    ],

    symptoms: [
      'Weight gain',
      'Dry skin',
      'Hair fall or thinning',
      'Goiter (swelling in the neck)',
      'Feeling tired and lethargic',
      'Constipation',
      'Slower than normal heart rate',
      'Feeling depressed',
    ],

    diagnosis: [
      'Detailed history of symptoms',
      'Blood tests to measure T4 and TSH levels',
    ],

    management: [
      'Medication containing a synthetic version of the thyroid hormone',
      'Regular blood tests to monitor and adjust thyroid levels',
    ],

    whenToConsultDoctor:
      "Consult a doctor if the prescribed treatment is ineffective and your symptoms do not improve despite regular medication.",
  },

  'increase-neutrophils': {
    title: "Increase Neutrophils",

    description:
      "Also known as neutrophilia or leukocytosis of neutrophils, this is a condition with a high number of neutrophils in the blood. Neutrophils are the most plentiful white blood cells (55%-70%) and act as the primary defense against bacterial infections and inflammation.",

    causes:
      "Causes include bacterial infections (especially pyogenic/pus-forming), acute inflammation (heart attacks, burns, infarcts), medications like prednisone, appendicitis, splenectomy, chronic myelogenous leukemia, and leukocyte adhesion deficiency.",

    riskFactors: [
      'Normal physiological processes (healthy neonates, women of childbearing age)',
      'Pregnancy and labor',
      'Vigorous exercise',
      'Pathological conditions increasing bone marrow output',
    ],

    symptoms: [
      'Neutrophilia itself does not cause symptoms directly',
      'Symptoms relate to the underlying cause: fever, exhaustion, and pain',
    ],

    diagnosis: [
      'Complete blood count (CBC) with differential',
      'Physical examination and medical history',
      'Specific tests for immature neutrophils (myeloblasts) or bone marrow samples if required',
      'CT scans, blood cultures, X-rays, and urine analysis',
    ],

    management: [
      'Treating the underlying cause',
      'For hyperleukocytosis: leukapheresis, cytoreductive therapy, hydration',
      'For myeloproliferative disorders: cytotoxic agents (hydroxyurea) under specialist supervision',
      'For chronic myeloid leukemia: tyrosine kinase inhibitors',
      'Avoiding overexertion and managing stress',
    ],

    whenToConsultDoctor:
      "Consult a doctor if you experience signs of infection (weakness, fever, fatigue, pain) or if you are concerned about your neutrophil count following an illness/injury.",
  },

  'infections': {
    title: "Infections",

    description:
      "An infection is the invasion and multiplication of harmful, disease-causing organisms (viruses, bacteria, fungi, parasites) in the body tissues. Severity varies based on host factors and the specific pathogen involved.",

    causes:
      "Caused by the invasion of Bacteria, Viruses, Fungi, Parasites, or Protozoa.",

    riskFactors: [
      'Immunosuppression',
      'Direct contact with an infected person or animal',
      'Use of certain medicines or steroids',
      'Pre-existing diseases that leave the body vulnerable',
    ],

    symptoms: [
      'Fever and Rash',
      'Diarrhea and Nausea/Vomiting',
      'Fatigue and Muscle aches',
      'Coughing and Headaches',
    ],

    diagnosis: [
      'Detailed medical history including symptom duration and intensity',
      'Laboratory investigations like CBC, Urine DR, ESR, and CRP',
    ],

    management: [
      'Administration of appropriate pathogen-specific medicines (antibiotics, antivirals, antifungals)',
      'Maintaining adequate hydration and nutrition',
    ],

    whenToConsultDoctor:
      "Consult a doctor if your infection lasts for more than 10 days, you experience new side effects, or feel general discomfort/malaise.",
  },

  'inflammation': {
    title: "Inflammation",

    description:
      "Inflammation is the body’s protective mechanism against viruses, bacteria, pathogens, irritants, or injuries. It releases proteins/antibodies and increases blood flow to heal the area. It can be Acute (short-term) or Chronic (long-term).",

    causes:
      "Caused by the invasion of foreign particles, pathogens causing infection, exposure to injuries, autoimmune disorders, or sensitivities.",

    riskFactors: [
      'Smoking and Alcohol intake',
      'Obesity',
      'Underlying chronic conditions',
    ],

    symptoms: [
      'Redness and Heat',
      'Swelling',
      'Fever',
      'Loss of function',
      'Fatigue',
    ],

    diagnosis: [
      'Medical history and physical examination for visible signs',
      'Blood tests looking for raised C-reactive protein (CRP) and Erythrocyte Sedimentation Rate (ESR)',
    ],

    management: [
      'Removal of the cause/trigger',
      'Medications: NSAIDs, painkillers, corticosteroids',
      'Lifestyle changes: reducing alcohol, quitting smoking, dietary supplements, anti-inflammatory diets',
    ],

    whenToConsultDoctor:
      "Consult your doctor immediately if symptoms worsen or if no improvement is seen after treatment.",
  },

  'insomnia': {
    title: "Insomnia",

    description:
      "Insomnia refers to difficulty falling asleep, maintaining sleep, waking up too early, or feeling exhausted after waking up in the morning.",

    causes:
      "Causes include stressful lifestyles/events (loss of a loved one, divorce, moving), jet lag/difficult work hours, medications (for depression, asthma, allergies), and physical pain from illnesses.",

    riskFactors: [
      'Excess caffeine, alcohol, or nicotine intake',
      'Using screens (phones/laptops) for long periods before bed',
      'Sleeping too much during the day',
      'Lack of a proper routine',
      'Worrying or chronic stress',
    ],

    symptoms: [
      'Staying awake at night or waking up frequently',
      'Feeling extremely tired and sleepy throughout the day',
      'Irritability and difficulty concentrating',
    ],

    diagnosis: [
      'History of symptoms and potentially keeping a sleep diary to track patterns',
    ],

    management: [
      'Developing a proper sleep routine and exercising regularly for mild cases',
      'Prescription sleeping pills for severe cases (to be used strictly as directed, not over-the-counter options)',
    ],

    whenToConsultDoctor:
      "Consult a doctor if you cannot sleep even after taking prescribed medication, or if the medicine is no longer effective.",
  },

  'iron-poisoning': {
    title: "Iron Poisoning",

    description:
      "Iron poisoning is an overdose of iron supplements, commonly seen in children who mistake the pills for candy. Symptoms typically appear when ingestion exceeds 10 mg/kg of body weight.",

    causes:
      "Accidental ingestion by children mistaking ferrous sulphate supplements for candy. Rarely, it occurs via intentional overdose in adults.",

    riskFactors: [
      'Presence of poorly secured iron supplements at home',
      'Young children in the household',
    ],

    symptoms: [
      'Diarrhea and vomiting (stomach irritation)',
      'Blood in vomit and stools (extreme cases)',
      'Fever, unconsciousness, and stomach pain',
      'Skin turning gray or blue',
      'Dehydration, dropped blood pressure, and pulse issues',
      'Seizures (due to electrolyte/water drop)',
      'Coma, shock, liver damage, and uncontrolled bleeding',
    ],

    diagnosis: [
      'History of symptom onset and noting missing supplements',
      'Blood tests for iron levels and metabolic acidosis',
      'X-rays to visualize swallowed pills in the stomach',
    ],

    management: [
      'Immediate hospital admission to monitor vitals',
      'Whole bowel irrigation (flushing stomach with a special solution)',
      'Chelation therapy (injecting chemicals to bind and excrete iron via urine in serious cases)',
    ],

    whenToConsultDoctor:
      "Iron poisoning is an emergency. Symptoms may delay for a few hours. If you suspect an overdose or find empty bottles, report it to a doctor immediately.",
  },

  'irregular-heart-rhythm': {
    title: "Irregular Heart Rhythm",

    description:
      "Irregular heart rhythm, or 'Arrhythmia', is an abnormal heartbeat due to improper heart function. Types include Tachycardia (fast heartbeat: atrial fibrillation, flutter, SVT, ventricular tachycardia) and Bradycardia (slow heartbeat: sick sinus syndrome, heart block).",

    causes:
      "Causes include electrolyte imbalances, medications, stress, heart diseases, and the use of alcohol, tobacco, or caffeine.",

    riskFactors: [
      'Advanced age and genetic factors',
      'Obesity and high blood pressure',
      'Diabetes and thyroid problems',
      'Smoking and tobacco use',
    ],

    symptoms: [
      'Chest pain',
      'Shortness of breath',
      'Palpitations',
      'Fatigue and dizziness',
      'Fainting',
    ],

    diagnosis: [
      'Physical examination of symptoms',
      'ECG',
      'Holter monitor and event monitor',
      'Stress test',
    ],

    management: [
      'Medications: digoxin, atropine, beta/calcium/sodium/potassium channel blockers',
      'Electrical cardioversion',
      'Pacemakers or implantable cardioverter defibrillators',
      'Vagal maneuvers or surgery',
    ],

    whenToConsultDoctor:
      "Seek urgent medical help right away if you experience any of the above-mentioned symptoms.",
  },

  'irregular-menstrual-periods': {
    title: "Irregular Menstrual Periods",

    description:
      "Irregular periods are menstrual cycles occurring less than 21 days or more than 35 days apart. It also includes missing 3 consecutive periods, cycles that are abnormally heavy/light, lasting longer than 7-8 days, accompanied by severe pain/vomiting, or bleeding post-menopause/post-sex.",

    causes:
      "Causes include birth control pills, stress, endometriosis, uterine polyps, PCOS, pelvic inflammatory disease, premature ovarian insufficiency, ectopic pregnancy, and cervical/uterine cancer.",

    riskFactors: [
      'Pregnancy and breastfeeding',
      'Stress and too much exercise',
      'Changing birth control pills or using certain medications',
      'Hyperthyroidism or hypothyroidism',
    ],

    symptoms: [
      'Spotting or bleeding between periods',
      'Excessive bleeding during periods',
      'Bleeding during sexual intercourse',
      'Bleeding after menopause',
    ],

    diagnosis: [
      'Medical history review regarding menstrual cycles',
      'Vaginal cultures and pelvic ultrasound',
      'Blood tests (to rule out anemia)',
      'Endometrial biopsy',
    ],

    management: [
      'Management is highly specific to the diagnosed underlying cause, potentially involving hormonal therapies or surgical intervention.',
    ],

    whenToConsultDoctor:
      "Consult a doctor when periods become severely irregular, last longer than usual (e.g., 20 days), or when side effects and pain worsen.",
  },

  'irritable-bowel-disease': {
    title: "Irritable Bowel Disease",

    description:
      "Irritable Bowel Syndrome/Disease is a common long-term GI disorder affecting bowel movements. Symptoms vary and mainly involve GI discomfort (bloating, cramps, gas, diarrhea, constipation). It is often triggered by specific foods, requiring patients to track their diet.",

    causes:
      "Triggered by specific foods/habits: Alcohol, fried/greasy foods, gluten, dairy products, processed foods (chemicals/refined sugars), coffee, excess sugar, and spicy foods.",

    riskFactors: [
      'Age and Female gender',
      'Stress, anxiety, and depression',
      'Family history of IBS',
    ],

    symptoms: [
      'Changes in bowel movements (constipation, diarrhea)',
      'Changes in stool texture and color',
      'Stomach bloating, gas, burping, and cramps',
      'Nausea, heartburn, acid reflux, loss of appetite, and feeling full easily',
      'Frequent/urgent urination',
      'Anxiety, trouble sleeping, headaches, bad taste in mouth, lower back muscle aches',
    ],

    diagnosis: [
      'Diagnosis based on presenting symptoms',
      'Complete medical history and physical examination',
      'Blood tests and X-rays to rule out other conditions',
    ],

    management: [
      'Dietary tracking to avoid triggers',
      'Supplements (Calcium, Vitamin D, Iron)',
      'Anti-diarrheals (Loperamide) and painkillers (Ibuprofen, naproxen)',
      'Immune system suppressors (Azathioprine, cyclosporine)',
      'Anti-inflammatory drugs (aminosalicylates, corticosteroids)',
      'Surgery for severely damaged digestive tracts',
    ],

    whenToConsultDoctor:
      "Consult a Gastroenterologist if you experience these symptoms, or if prescribed medications fail to relieve your symptoms.",
  },

  'ischemic-stroke': {
    title: "Ischemic Stroke",

    description:
      "Ischemic stroke (cerebral ischemia) occurs when the blood supply to the brain is cut off, causing rapid brain cell death and loss of neurologic function. It is the most common type of stroke and requires immediate emergency treatment.",

    causes:
      "Causes include thrombosis (local blood clot), embolism (clot traveling from elsewhere), systemic hypoperfusion (e.g., shock), heart attacks, narrowed blood vessels from vessel wall injury (hypertension/diabetes), blood clotting problems, and heart valve disease.",

    riskFactors: [
      'Modifiable: High blood pressure, diabetes, cardiac disease, smoking, obesity, increased homocysteine/cholesterol',
      'Non-modifiable: Family history, Male gender, advanced age, African-American race',
    ],

    symptoms: [
      'Visual disturbances',
      'Numbness or drooping of face, legs, or arms (often on one side)',
      'Confusion and slurred speech',
      'Severe headache',
      'Dizziness (lightheadedness)',
    ],

    diagnosis: [
      'Thorough medical history and physical examination',
      'Stethoscope check over the carotid artery for narrowed artery sounds',
      'Physical/mental capability tests (strength, memory, speech)',
      'Ultrasound, CT, MRI, CT angiography, or MR angiography',
    ],

    management: [
      'Emergency maintenance of breathing, blood pressure, and heart rate',
      'Tissue plasminogen activator (clot buster)',
      'Anti-coagulants and anti-platelets',
      'Surgical clot removal and stenting to open arteries',
    ],

    whenToConsultDoctor:
      "Consult a doctor immediately if you experience any stroke symptoms. Urgent medical assistance is required to prevent permanent brain damage or death.",
  },

  'itchy-skin': {
    title: "Itchy Skin",

    description:
      "Itchy skin (pruritus) is an uncomfortable sensation that makes you want to scratch. It is usually caused by dry skin and is common in older adults. Persistent scratching can cause thick, raised skin areas that bleed.",

    causes:
      "Causes include dry skin, skin conditions (eczema, burns), internal diseases (liver disease, anemia, kidney disease, diabetes, lymphoma), nerve disorders, allergic reactions (soaps, chemicals, wools), and psychiatric conditions (OCD, depression, anxiety).",

    riskFactors: [
      'Older age (skin becomes drier)',
      'Underlying medical or psychiatric conditions',
      'Exposure to allergens or harsh chemicals',
    ],

    symptoms: [
      'Redness, bumps, and blisters',
      'Scaly patches',
      'Scratch marks',
    ],

    diagnosis: [
      'Physical examination and medical history',
      'Blood tests',
      'Thyroid, liver, and kidney function tests',
      'Chest X-rays (for internal causes like lymphoma)',
    ],

    management: [
      'Moisturize daily and avoid situations that cause itching',
      'Treat the scalp',
      'Reduce anxiety/stress and stay well-rested',
      'Use humidifiers, soothing lotions, and gels',
      'Avoid scratching',
    ],

    whenToConsultDoctor:
      "Consult your doctor if your condition persists or worsens over time.",
  },

  'kaposis-sarcoma': {
    title: "Kaposi's Sarcoma",

    description:
      "Kaposi's sarcoma (KS) is a cancer that develops tiny blood vessel tumors below the skin, in the mouth, eyes, nose, anus, and organs (lungs, liver, intestines, stomach, lymph nodes). The lesions are typically purple. Subtypes include classic, endemic, epidemic (AIDS-related), and immunosuppression therapy-related KS.",

    causes:
      "Caused by Kaposi’s sarcoma-associated herpesvirus (KSHV/HHV-8). The virus promotes cancer cell proliferation. It is transmitted via saliva, kissing, organ transplants, and blood transfusions.",

    riskFactors: [
      'HIV/AIDS infection (highest risk)',
      'Men who have sex with men (in HIV-positive populations)',
      'Men are affected eight times more than women',
      'Patients on immune-suppressing drugs post-organ transplant',
    ],

    symptoms: [
      'Skin: Flat, painless red/purple spots on light skin, or bluish/black on dark skin',
      'Mucous Membranes: Lesions in mouth/throat causing eating/swallowing trouble, lesions on eyes',
      'Lymph nodes: Severe swelling in arms, legs, face, or scrotum',
      'Respiratory/Digestive tract: Serious coughing, shortness of breath, vomiting, belly pain, bloody stool, anemia',
    ],

    diagnosis: [
      'Biopsy of the tissue',
      'Detection of KSHV protein LANA in tumor cells',
      'Fecal occult blood test and Chest X-ray',
      'Endoscopy, Bronchoscopy, or Colonoscopy',
    ],

    management: [
      'Antiviral drug combinations',
      'Stopping immune-suppressing medication if possible (for transplant patients)',
      'For small lesions: Minor surgery, cryotherapy, electrodesiccation, low-dose radiation, chemo injections, topical retinoids',
      'Standard systemic anti-cancer meds if >25 lesions exist',
    ],

    whenToConsultDoctor:
      "Consult a doctor immediately if visible lesions develop on the skin/eyes/mouth, or if you experience trouble eating/swallowing, severe swelling, breathing trouble, or bloody stools.",
  },

  'leukemia': {
    title: "Leukemia",

    description:
      "Leukemia is a cancer of the body’s blood-producing tissues, including the bone marrow and lymphatic system. It involves abnormal white blood cells (WBCs) that do not function properly, leaving the body unable to fight infections. Major types include ALL, AML, CLL, and CML.",

    causes:
      "The exact causes are unclear, though it is believed to develop from a combination of genetic and environmental factors.",

    riskFactors: [
      'Preventable: Exposure to chemicals like benzene (car repair, coal mines, petroleum) and smoking',
      'Non-preventable: Hereditary history, genetic syndromes (Down’s syndrome), and previous chemotherapy or radiotherapy',
    ],

    symptoms: [
      'Pin-head sized red spots on skin',
      'Lethargy and fatigue',
      'Elevated body temperature and fevers',
      'Discomfort in the lower body',
      'Susceptibility to persistent infections',
      'Loss of appetite and weight loss',
      'Gingivitis (bleeding/swollen gums) and significant bruising/bleeding',
    ],

    diagnosis: [
      'Evaluation of family and medical history along with clinical examination',
      'Complete blood count (CBC) test',
      'Bone marrow biopsy to identify the specific type of leukemia',
    ],

    management: [
      'Chemotherapy (uses medications to kill leukemia cells)',
      'Targeted therapy (focuses on specific abnormalities in cancer cells)',
      'Radiation therapy',
      'Bone marrow transplant (replaces unhealthy marrow with healthy stem cells)',
      'Immunotherapy and engineering immune cells (T-cells) to fight cancer',
    ],

    whenToConsultDoctor:
      "Consult a doctor if you experience paleness, enlarged lymph nodes, swollen gums, an enlarged liver/spleen, significant bruising/bleeding, persistent fevers, fatigue, or small pinpoint rashes.",
  },

  'lice': {
    title: "Lice",

    description:
      "Lice are tiny parasitic insects that feed on human blood. They easily spread among school children through close contact and sharing belongings. People with good hygiene can also get lice. Types include head lice, body lice, and pubic lice.",

    causes:
      "Lice do not jump or fly; they spread through direct head-to-head or body contact, sharing personal belongings, contacting contaminated furniture, or sexual contact.",

    riskFactors: [
      'Using infested brushes, combs, or towels',
      'Lying in a bed, carpet, or couch of an infected person',
      'Wearing clothing (caps, hats, hair accessories) worn by an infected person',
    ],

    symptoms: [
      'Intense itching and tickling sensation',
      'Visible lice eggs (nits)',
      'Sores on the scalp',
      'Bite marks',
    ],

    diagnosis: [
      'Visual inspection of the scalp, hair, body, or clothing for live lice and nits',
    ],

    management: [
      'Use of medicated shampoos, lotions, or creams (pediculicides)',
      'Physical removal of nits with specialized combs',
      'Washing all contaminated clothing, bedding, and brushes in hot water',
    ],

    whenToConsultDoctor:
      "Consult your doctor when the symptoms start to occur to get recommendations for proper medicated treatments.",
  },

  'lichen-planus': {
    title: "Lichen Planus",

    description:
      "Lichen Planus is an inflammatory skin condition that causes itchy, non-infectious rashes (small, flat-topped, pink/purple bumps) on the arms and legs. It is believed to be an autoimmune disease.",

    causes:
      "The exact cause is unknown, but it is believed to be an autoimmune response where the body attacks its own healthy cells.",

    riskFactors: [
      'Middle age',
      'Female gender (higher chance than men)',
      'Change of dental fillings',
    ],

    symptoms: [
      'Skin: Sudden rash lasting months, shiny/raised pink/purple flat-topped bumps, white streaked papules (Wickham’s striae), intense itching (especially at night)',
      'Oral: White streaks inside cheeks/lips/gums/tongue, redness/blisters, disturbed metallic taste, dry mouth',
      'Penis: Purple or white ring-shaped patches, usually not itchy (similar to thrush)',
    ],

    diagnosis: [
      'Physical examination of blisters and inflamed patches',
      'Skin biopsy',
    ],

    management: [
      'Regular use of prescribed medicines',
      'Steroid creams and Corticosteroids',
      'Avoidance of substances that trigger itching',
    ],

    whenToConsultDoctor:
      "Consult a doctor if symptoms do not improve within a few days, or if you experience severe itching and red blisters.",
  },

  'liver-diseases': {
    title: "Liver Diseases",

    description:
      "Liver diseases encompass a variety of conditions affecting the liver, including hereditary diseases (hemochromatosis, Wilson’s), cancers/tumors, infectious diseases (hepatitis), and autoimmune disorders (autoimmune hepatitis).",

    causes:
      "Causes include non-alcoholic fatty deposits (due to obesity, diabetes, high cholesterol, medication overuse), unhealthy lifestyle/food (causing hepatitis), transmission of Hepatitis C via blood/semen, and poisoning from toxins (arsenic, carbon tetrachloride).",

    riskFactors: [
      'Excessive alcohol usage (swells liver and impairs function)',
      'Unprotected sex and sharing injection needles',
      'Non-sterile tattoos or piercings',
      'Nutritional deficiency and Metabolic syndrome',
      'Autoimmune reactions and genetic defects',
    ],

    symptoms: [
      'Yellowish skin and eyes (jaundice)',
      'Abdominal pain and swelling',
      'Swelling of legs and ankles',
      'Itchy skin',
      'Dark urine and pale stool',
      'Chronic fatigue, nausea, vomiting, loss of appetite',
      'Tendency to bruise easily',
    ],

    diagnosis: [
      'Detailed medical/lifestyle history (alcohol, medicines, blood transfusions, sexual activity, diet, toxin exposure)',
      'Physical examination (feeling for enlarged liver or abdominal fluid)',
      'Blood tests (antigen/antibody for hepatitis, LFTs for enzymes/bilirubin)',
      'Imaging (Ultrasound, CT, MRI)',
      'Liver biopsy',
    ],

    management: [
      'Antiviral drugs and Interferons for hepatitis',
      'Alcohol and obesity control to slow cirrhosis',
      'Radiation/medicines for liver cancer',
      'Surgery (hepatectomy) to remove damaged parts',
      'Liver transplant for liver failure',
      'Prevention: vaccinations (Hep A/B), condoms, sterile needles, using masks/gloves with toxins',
    ],

    whenToConsultDoctor:
      "Consult a doctor if your condition worsens, symptoms increase in frequency/intensity, new side effects occur, or you experience extreme fatigue and lethargy.",
  },

  'local-numbness': {
    title: "Local Numbness",

    description:
      "Numbness is an unusual prickling sensation occurring in any part of the body, usually hands, feet, arms, and legs. It is not always a cause for concern and often stems from postural habits.",

    causes:
      "Everyday habits like sitting/standing in one position or falling asleep on an arm. Medical causes include exposure to seafood toxins, animal/insect bites, abnormal vitamin B-12/calcium/sodium levels, radiation therapy, and certain medications (chemotherapy).",

    riskFactors: [
      'Poor postural habits',
      'Nutritional deficiencies',
      'Exposure to specific medical treatments or toxins',
    ],

    symptoms: [
      'Burning',
      'Tingling',
      'Itching',
      'Tickling',
      'A crawling feeling under the skin',
    ],

    diagnosis: [
      'Blood tests',
      'MRI (Magnetic Resonance Imaging)',
      'X-rays',
    ],

    management: [
      'Changing postural habits and avoiding tight footwear/clothing',
      'Corticosteroids',
      'Antidepressants',
      'Nerve pain medications like Pregabalin and Gabapentin',
    ],

    whenToConsultDoctor:
      "Consult a doctor when numbness is not related to postural habits, is accompanied by chronic symptoms, lasts for long periods, or involves permanent changes in limb shape, color, or temperature.",
  },

  'lung-cancer': {
    title: "Lung Cancer",

    description:
      "Lung cancer is the abnormal growth of lung tissues that hinders respiratory gas exchange. It is the most common cancer and major cause of death. Types include Small cell and Non-small cell (squamous, adenocarcinoma, large cell). It stages from Occult (hidden) to Stage 4 (spread to vital organs/brain).",

    causes:
      "Primarily caused by smoking, exposure to secondhand smoke, exposure to carcinogens (like asbestos), and genetics.",

    riskFactors: [
      'Smoking (active or passive)',
      'Family history of lung cancer',
      'Exposure to Asbestos or other Carcinogens',
    ],

    symptoms: [
      'Persistent coughing',
      'Recurrent respiratory infections',
      'Hemoptysis (coughing up of blood)',
      'Dyspnea (shortness of breath) and Wheezing',
      'Chest pain (may radiate to shoulder/arm)',
      'Fatigue that’s worse than usual',
      'Fever, loss of appetite, and weight loss',
    ],

    diagnosis: [
      'Physical examination and detailed medical history',
      'Imaging (CT scan or X-ray) to detect abnormal masses',
      'Lab tests (sputum cytology)',
      'Biopsy of lung tissue',
    ],

    management: [
      'Surgery to remove tumors',
      'Chemotherapy and Radiotherapy',
      'Radiofrequency ablation',
      'Immunotherapy',
      'Palliative therapy to manage symptoms',
    ],

    whenToConsultDoctor:
      "If one suffers from any of the symptoms mentioned above, a medical professional should be consulted right away.",
  },

  'lung-diseases': {
    title: "Lung Diseases",

    description:
      "Lung diseases lead to improper functioning of the lungs. They can be classified into 3 types: Airway diseases affecting the tubes that carry gases (e.g., asthma, COPD, bronchiectasis), Lung tissue diseases affecting the structure of lung tissues (e.g., pulmonary fibrosis, sarcoidosis), and Lung circulation diseases affecting blood vessels in the lungs (e.g., pulmonary hypertension). Lung diseases occur when there is a problem in any part of the respiratory system.",

    causes:
      "Causes include smoking cigarettes/cigars/pipes, exposure to radon (an odorless and colorless gas), asbestos (found in insulation, fireproofing, car brakes), air pollution like car exhaust, and diseases caused by germs (viruses, bacteria, fungi) such as the flu.",

    riskFactors: [
      'Tobacco smoke',
      'Indoor and outdoor air pollutants',
      'Allergens and occupational agents',
      'Unhealthy diet and nutrition',
      'Raised blood pressure and blood glucose',
      'Abnormal blood lipids',
      'Obesity (over-weight)',
      'Heart diseases, stroke, cancer, and diabetes',
    ],

    symptoms: [
      'Trouble breathing',
      'Shortness of breath (SOB)',
      'The feeling of not getting enough air',
      'Decreased ability to exercise',
      'Cough that doesn’t go away',
      'Pain and discomfort while breathing',
      'Coughing up mucus or blood',
    ],

    diagnosis: [
      'Spirometry (breathing in and out hard through a tube)',
      'Challenge test (involving methacholine to temporarily narrow airways)',
      'FeNO test (measures nitric oxide in exhaled air)',
      'Peak flow measurement (measures how much air you can blow out)',
      'Pulse oximetry (measures how much oxygen RBCs are carrying)',
    ],

    management: [
      'Inhalers',
      'Prescription medications',
      'Oxygen therapy',
      'Pulmonary rehab',
      'Surgery in severe cases',
    ],

    whenToConsultDoctor:
      "You should consult a pulmonologist (lung expert) if you experience chest pain, wheezing, dizziness, trouble breathing, a severe cough lasting more than three weeks, hard-to-control asthma, or recurring bronchitis/cold.",
  },

  'malabsorption-syndrome': {
    title: "Malabsorption Syndrome",

    description:
      "Malabsorption Syndrome is an abnormal condition characterized by low absorption of essential nutrients from the small intestine. These include macronutrients (proteins, carbohydrates) and micronutrients (minerals, vitamins).",

    causes:
      "Causes include damage to the intestine due to inflammation and infection, prolonged and unnecessary use of antibiotics, conditions like Crohn’s disease and chronic pancreatitis, lactose intolerance/deficiency, congenital defects (biliary atresia), obstructed bile flow, parasitic infections, radiation therapy, and usage of certain drugs (e.g., tetracyclines).",

    riskFactors: [
      'Family history',
      'Consumption of large amounts of alcohol',
      'Intestinal surgery',
      'Travel to areas where intestinal infections are endemic',
    ],

    symptoms: [
      'Light-colored, foul-smelling stools',
      'Dry, thin hair, which may be accompanied by hair loss',
      'Bloating, gas, and explosive diarrhea',
      'Anemia (low hemoglobin or red blood cell count)',
      'Muscle wasting',
      'Fatigue and low blood pressure',
      'Brittle nails',
    ],

    diagnosis: [
      'Physical examination and check of relevant symptoms (persistent diarrhea, nutrient deficiencies)',
      'Blood tests and Stool tests',
      'Breath tests',
      'Imaging tests',
      'Biopsy (in severe cases)',
    ],

    management: [
      'Regular use of prescribed medicines',
      'Dehydration therapy',
      'Intravenous glucose administration (ringer’s lactate)',
      'Dietary supplements',
    ],

    whenToConsultDoctor:
      "Early diagnosis can lead to effective and successful treatment. If your symptoms do not improve within a few days, or you experience persistent diarrhea or abnormal-colored stools, please see a doctor.",
  },

  'malaria': {
    title: "Malaria",

    description:
      "Malaria is a life-threatening infectious disease caused by plasmodium protozoa and transmitted by the bite of the female anopheline mosquito. Plasmodium has four species: P. falciparum, P. vivax, P. ovale, and P. malariae. The incubation period is typically 8-25 days (15-30 days for P. malariae).",

    causes:
      "Malaria is caused solely by the plasmodium parasite. It can be transmitted through female mosquito bites, blood transfusions, vertical transmission (mother to unborn child), sharing needles, and organ transplants.",

    riskFactors: [
      'Living in or traveling to endemic areas (Africa, South America, Southern Asia, Central America)',
      'Monsoon season (standing water breeds mosquitoes)',
      'Not using mosquito repellents, full-sleeved clothing, or bed nets',
    ],

    symptoms: [
      'Symptoms occurring periodically or in cycles',
      'High fever with shivering',
      'Sweating, nausea, vomiting, and diarrhea',
      'Headache, muscle aches, and body aches',
    ],

    diagnosis: [
      'Complete medical history and physical exam',
      'Blood tests to detect the presence of the antigen, identify the species, and check antibodies',
    ],

    management: [
      'Anti-malarial medicines (chloroquine, primaquine, artemether, doxycycline, artesunate)',
      'Paracetamol and ibuprofen for pain and fever',
      'Diet including fresh juices and low-fat foods',
    ],

    whenToConsultDoctor:
      "If you live in or have recently travelled to an area where malaria is common and experience the symptoms mentioned above, you should contact your doctor.",
  },

  'malaria-in-pregnancy': {
    title: "Malaria in Pregnancy",

    description:
      "Malaria in pregnancy is a syndrome that occurs only in pregnant females due to the bite of an infected female anopheles mosquito. It is characterized by the accumulation of infected blood cells in the placenta, which can be life-threatening for both mother and baby.",

    causes:
      "Caused by the bite of an infected female Anopheles mosquito. The most common species of the malarial parasite involved is Plasmodium vivax.",

    riskFactors: [
      'Visiting an endemic area',
      'Immigrants returning to an endemic area (loss of partial immunity)',
      'Rainy/Monsoon season',
    ],

    symptoms: [
      'Fever and chills',
      'Myalgia (muscle pain) and Malaise',
      'Headache',
      'Seizures',
      'Respiratory problems',
    ],

    diagnosis: [
      'Assessment of fever, chills, seizures, or respiratory problems in pregnant women who traveled to endemic regions',
      'Blood smear test (if negative, repeated every 12-24 hours)',
    ],

    management: [
      'Preventive measures: avoiding endemic areas, using insect repellent/bed nets, chemoprophylaxis',
      'Oral quinine and clindamycin in the first trimester',
      'Artemisinin combination therapy in the 2nd and 3rd trimester',
      'IV antimalarials for severe cases',
      'Primaquine administered postpartum',
    ],

    whenToConsultDoctor:
      "Consult your doctor immediately if you experience any of the above-mentioned symptoms after visiting an endemic region.",
  },

  'male-hypogonadism': {
    title: "Male Hypogonadism",

    description:
      "Hypogonadism in men is a disease characterized by the dysfunction of the gonads (testes), resulting in a deficiency of testosterone. This hormone is crucial for secondary sexual characteristics and adequate sperm production. Primary hypogonadism is the inability of the testes to produce sex hormones, while secondary hypogonadism is the brain's inability to send production signals.",

    causes:
      "Unchangeable causes include birth defects (undescended testicles), genetic defects (Klinefelter syndrome), structural/glandular defects, brain defects (tumor, trauma), and old age. Changeable causes include severe mumps, testicle injury/radiation, liver/kidney disease, long-term drug use (steroids, opioids), HIV/AIDS, obesity, and iron deficiency anemia.",

    riskFactors: [
      'Morbid obesity and Malnutrition',
      'Diabetes and Hypertension',
      'Renal failure',
      'HIV/AIDS',
      'Age above 40 years',
      'Chemotherapy',
    ],

    symptoms: [
      'Before puberty: Impaired growth of penis, testicles, facial/body hair, Adam’s apple, and muscle mass, plus lack of voice deepening',
      'After puberty: Impotence, decreased libido, fatigue, sleep disturbances, depression, anxiety, gynecomastia, decreased bone mass, loss of body hair',
    ],

    diagnosis: [
      'Physical examination of sex organs, hair growth, and body mass',
      'Hormone tests for testosterone, FSH, LH, and prolactin',
      'Semen tests for sperm count',
      'CBC for anemia, and thyroid tests',
      'Ultrasound of sex organs, and MRI/CT scans for brain tumors/defects',
    ],

    management: [
      'Testosterone replacement therapy (Androgen replacement therapy) administered via lozenges, intramuscular injections, transdermal patches, or topical creams',
    ],

    whenToConsultDoctor:
      "The condition is best handled by an Endocrinologist (specialist in hormonal problems) or an Infertility specialist for proper evaluation and specialized treatment.",
  },

  'manic-depressive-psychosis': {
    title: "Manic Depressive Psychosis",

    description:
      "Manic-depressive psychosis, more commonly known as Bipolar disorder, is a serious psychiatric condition where the patient alters between episodes of depression and periods of elevated mood (mania/hypomania). It typically appears around 15-24 years of age and lasts a lifetime, often involving sleeplessness, hallucinations, delusions, or paranoid rage.",

    causes:
      "The exact cause is unknown, but it involves the dysregulation of brain functioning, can run in families, or occur due to other medical conditions.",

    riskFactors: [
      'Genetics (a strong factor)',
      'Borderline personality (difficulty controlling emotions)',
      'Personal or family history of other psychiatric disorders',
      'Alcohol or drug abuse',
    ],

    symptoms: [
      'Depressive: Persistent low mood, loss of appetite/interest, fatigue, feelings of worthlessness, sleep changes, weight gain/loss',
      'Manic: Easily distracted, feelings of grandiosity, elevated mood, increased sexual desire/energy, decreased sleep, increased speaking tone',
    ],

    diagnosis: [
      'Physical examination and lab tests to rule out underlying medical conditions',
      'Psychiatric assessment regarding feelings, thoughts, and behavior patterns',
      'Comparison against criteria for bipolar disorder',
      'Mood charting (daily record of moods and sleep patterns)',
    ],

    management: [
      'Anti-depressants (SSRIs)',
      'Antipsychotics',
      'Anti-anxiety medications (Benzodiazepines)',
      'Mood stabilizers (Lithium)',
      'Counseling and Psychotherapy',
    ],

    whenToConsultDoctor:
      "Consult a doctor if family or friends observe unusual behavior or the mentioned symptoms. Suicidal thoughts represent a medical emergency requiring immediate hospitalization.",
  },

  'melanoma': {
    title: "Melanoma",

    description:
      "Melanoma (malignant melanoma) is a type of skin cancer developing from melanocytes (pigment-producing cells). It mostly occurs in the skin but can rarely appear in the intestine, mouth, or eye. Nearly 25% of melanomas start from moles.",

    causes:
      "Primary causes include DNA damage caused by ultraviolet (UV) light exposure from the sun or tanning beds, genetics, and environmental factors.",

    riskFactors: [
      'Fair skin (less melanin to protect from UV damage)',
      'History of sunburn and excessive UV exposure',
      'Living closer to the earth’s equator',
      'Having more than 50 moles',
      'Family history of melanoma',
      'Weak immune system',
    ],

    symptoms: [
      'Change in an existing mole (size, color, irregular edges)',
      'Development of pigmented or unusual-looking growth on the skin',
      'Nodular melanoma (new lump anywhere on the skin)',
      'Moles that itch, ulcerate, or bleed',
      'Metastatic symptoms: loss of appetite, nausea/vomiting, fatigue',
    ],

    diagnosis: [
      'Physical examination of the skin for warning signs',
      'Biopsy (removing a sample of tissue for testing)',
    ],

    management: [
      'Surgery (standard treatment option)',
      'Skin grafts for large areas',
      'Lymph node biopsy/removal if cancer has spread',
      'Radiation, Chemotherapy, Immunotherapy, and Targeted therapy',
    ],

    whenToConsultDoctor:
      "Regularly check your skin. If you notice any of the above symptoms, consult a doctor immediately. Early diagnosis increases the chances of successful treatment.",
  },

  'menstrual-pain': {
    title: "Menstrual Pain",

    description:
      "Menstrual pain, also known as dysmenorrhea, occurs in the lower abdomen before or during menstrual periods and may last 2-3 days. Severity varies; it can be mild or severe enough to hamper daily activity, and is often associated with nausea, headache, and lower back pain.",

    causes:
      "Uterine muscles produce prostaglandins, which stimulate contraction and cause pain. Other underlying causes include endometriosis, fibroids, adenomyosis, ovarian cysts, pelvic inflammatory disease, and cervical stenosis.",

    riskFactors: [
      'Age below 30',
      'Early puberty',
      'Irregular periods',
      'Obesity',
      'Heavy bleeding',
      'Smoking',
    ],

    symptoms: [
      'Throbbing pain in the lower abdomen',
      'Headache',
      'Vomiting and Nausea',
      'Weakness',
      'Lower back and leg pain',
    ],

    diagnosis: [
      'Detailed menstrual history',
      'Ultrasound and pregnancy tests',
      'Laparoscopy and hysteroscopy (if underlying conditions are suspected)',
    ],

    management: [
      'Painkillers (OTC NSAIDs)',
      'Hormonal birth control pills',
      'Surgery (for cysts, endometriosis, fibroids, polyps)',
      'Home remedies: heating pads, hot baths, lower back massage, exercises, and yoga',
    ],

    whenToConsultDoctor:
      "Consult your doctor if you experience menstrual pain for the first time after age 25, if pain is not relieved by OTC painkillers, if accompanied by fever, or if the pain suddenly worsens.",
  },

  'migraine': {
    title: "Migraine",

    description:
      "Migraine is a neurological condition where the patient experiences intense, recurring, throbbing pain on one side of the head, lasting from 4 to 72 hours. Types include migraine with/without aura, menstrual, silent, vestibular, abdominal, and basilar migraines.",

    causes:
      "Causes include stress, physical exertion, sleep changes, alcohol consumption, and hormonal changes.",

    riskFactors: [
      'Hereditary factors (family history of migraines)',
      'Female gender (more commonly affected than men)',
      'Exposure to specific triggers (stress, alcohol, cheese, certain sounds/lights, drugs)',
    ],

    symptoms: [
      'Prodrome (days before): Depression, anxiety, irritability, food cravings, neck stiffness',
      'Aura (hours/minutes before): Vision loss, numbness/weakness on one side, speaking difficulty, tingling, auditory hallucinations',
      'Attack: Throbbing pain, nausea, dizziness, vomiting, sensitivity to light and sound',
      'Postdrome (24 hours after): Confusion, fatigue, dizziness, mood changes',
    ],

    diagnosis: [
      'Detailed history and physical examination',
      'CT scan or MRI if migraines worsen or don’t improve (to rule out other causes)',
    ],

    management: [
      'Acute medication to fight pain directly during an attack',
      'Preventive medication if suffering 2 or more episodes per month',
      'Prevention tactics: staying hydrated, adequate sleep, exercise, relaxation skills, avoiding triggers/stress',
    ],

    whenToConsultDoctor:
      "A doctor should be consulted if your headaches are severe, recurrent, and you are unable to get relief from the pain.",
  },

  'mild-to-moderate-acne': {
    title: "Mild to Moderate Acne",

    description:
      "Acne is a skin disorder resulting from the clogging of hair follicles with oil and dead skin cells. Inflammation of these follicles manifests as blackheads, whiteheads, pimples, knots, and scars.",

    causes:
      "Cardinal causes include hormonal imbalances, genetics, increased sebum production, diet, environmental factors, bacterial contamination of clogged follicles, and chemical irritants.",

    riskFactors: [
      'Physical irritation (tight clothes, pulling/scratching)',
      'Sharing cosmetic products or trying new makeup',
      'Certain medicines or topical ointments',
      'Hormonal imbalance (menstrual cycle in women)',
      'Excessive sun exposure and humid climates',
      'Excessive consumption of oily foods',
      'Obesity and physical/emotional stress',
    ],

    symptoms: [
      'Blackheads, whiteheads, and pimples',
      'Scars on the face, chest, back, or shoulders',
      'Swollen, red, pus-filled bumps that bleed upon irritation',
      'Large, painful lumps under the skin',
      'Red lesions with crusted borders',
    ],

    diagnosis: [
      'Extensive physical examination of the skin',
      'Thorough medical and family history',
      'Assessment of location, severity, type, and duration of acne',
    ],

    management: [
      'Balanced diet and regular face washing/skincare routine',
      'Avoiding cosmetics and greasy creams/ointments',
      'Topical retinoids and benzoyl peroxide',
      'Topical and oral antibiotics',
      'Hormonal therapies',
    ],

    whenToConsultDoctor:
      "Consult a doctor if acne is severe, unresponsive to OTC medication, or accompanied by symptoms like facial hair growth, hair loss, or weight gain (indicating potential hormonal disturbances).",
  },

  'moderate-to-severe-pain': {
    title: "Moderate to Severe Pain",

    description:
      "Pain is a distressing feeling and unpleasant physical or emotional experience. It is classified by location, duration, nature, and intensity. It acts as a helpful tool for diagnosing underlying diseases and can present in conditions ranging from minor injuries to severe systemic diseases.",

    causes:
      "Common causes include headaches, stomachaches, muscle strains, menstrual cramps, cuts, arthritis, and bone fractures. Systemic causes include Rheumatoid arthritis, Lupus, Myasthenia gravis, and Juvenile arthritis.",

    riskFactors: [
      'Old age and Obesity',
      'Race and Genetics',
      'Previous injuries or childhood trauma',
      'Stress and Smoking',
      'Working at a place requiring extreme physical activity',
    ],

    symptoms: [
      'Facial frowning and whimpering/groaning',
      'Constant shifting in bed and restlessness',
      'Agitation and feeling uneasy',
      'Withdrawing the painful area from touch',
      'Bad mood',
    ],

    diagnosis: [
      'Medical history and examination of the painful area',
      'Blood tests to rule out systemic disorders',
      'Assessment of pain location, nature, intensity, duration, and aggravating/relieving factors',
    ],

    management: [
      'Pain-relieving medicines',
      'Physical therapies (heat/cold packs, exercise)',
      'Psychological therapies (cognitive behavioral therapy, meditation)',
      'Acupuncture, occupational therapy, and community support groups',
    ],

    whenToConsultDoctor:
      "Consult a doctor if your pain worsens, there is no improvement, you feel general uneasiness, or if you experience new side effects from pain medications.",
  },

  'motion-sickness': {
    title: "Motion Sickness",

    description:
      "Motion sickness (travel sickness) is a sensory mismatch where the eyes' perception of movement doesn't match the inner ear's perception. These conflicting signals cause nausea, headaches, and disorientation.",

    causes:
      "Occurs when nerves sensing movement send inconsistent signals to the brain (e.g., inner ears feel movement in a car/boat/plane, but eyes do not confirm it).",

    riskFactors: [
      'Reading or using electronic devices while traveling',
      'Sitting in areas with restricted outside views',
      'Exposure to strong odors, spicy/greasy foods, and alcohol while traveling',
    ],

    symptoms: [
      'Loss of desire for food',
      'Excessive saliva collection and sweating',
      'Nausea and disorientation',
      'Headaches',
      'Complete incapacitation in severe cases',
    ],

    diagnosis: [
      'Review of medical history and physical/neurological examination',
      'Hearing tests to determine if symptoms stem from inner ear balance issues',
    ],

    management: [
      'Over-the-counter antihistamines (Dimenhydrinate, Meclizine)',
      'Anti-emetic drugs (to reduce nausea)',
      'Focusing on the horizon and keeping the head still',
      'Avoiding smoking, strong odors, and heavy foods',
      'Trying ginger and eating lightly',
    ],

    whenToConsultDoctor:
      "If the helpful tips and over-the-counter options don't relieve your or your child's motion sickness, ask your doctor about other options.",
  },

  'multiple-myeloma': {
    title: "Multiple Myeloma",

    description:
      "Multiple Myeloma is a cancer that forms in plasma cells (white blood cells that make antibodies). Cancerous plasma cells accumulate in the bone marrow, crowding out healthy cells and producing abnormal proteins.",

    causes:
      "The exact cause is unclear. It begins with one abnormal plasma cell that multiplies rapidly in the bone marrow.",

    riskFactors: [
      'Male sex',
      'Increasing age',
      'Black race',
      'Family history of multiple myeloma',
    ],

    symptoms: [
      'Nausea and loss of appetite',
      'Bone pain',
      'Weight loss',
      'Weakness and fatigue',
      'Numbness in the legs',
      'Excessive thirst',
    ],

    diagnosis: [
      'Accidental detection through routine blood tests',
      'Bone marrow examination',
      'Urine tests',
      'Imaging tests',
    ],

    management: [
      'Targeted therapy and biological therapies',
      'Chemotherapy and Corticosteroids',
      'Bone marrow transplant',
      'Radiation therapy',
    ],

    whenToConsultDoctor:
      "Consult your doctor when symptoms occur or if they won’t go away after treatment.",
  },

  'multiple-sclerosis': {
    title: "Multiple Sclerosis",

    description:
      "Multiple Sclerosis (MS) is a potentially disabling autoimmune disease of the central nervous system (brain and spinal cord). The immune system attacks the protective myelin sheath covering nerve fibers, leading to communication problems and permanent nerve deterioration.",

    causes:
      "The exact cause is unknown, but it is an autoimmune disorder likely triggered by a combination of genetics and environmental factors.",

    riskFactors: [
      'Age (mostly occurs between 20 and 40 years)',
      'Female sex (more likely than men)',
      'Family history and certain genetics',
      'Viral infections (e.g., Epstein-Barr virus)',
      'Race (White people are at highest risk)',
      'Low Vitamin D levels and low sunlight exposure',
      'Other autoimmune diseases and smoking',
    ],

    symptoms: [
      'Numbness and tingling',
      'Muscle spasms, stiffness, and weakness',
      'Mobility problems and fatigue',
      'Pain',
      'Cognitive issues (thinking, learning, planning)',
      'Anxiety, depression, and sexual problems',
      'Difficulty in speech and swallowing',
      'Bladder problems',
    ],

    diagnosis: [
      'Neurological examination (checking vision, strength, balance, reflexes)',
      'MRI scan (shows damage/scarring of myelin sheath)',
      'Evoked potential tests',
      'Lumbar puncture (spinal tap)',
      'Blood tests (to rule out other causes)',
    ],

    management: [
      'Treating specific MS symptoms individually',
      'Disease-modifying therapies (to reduce the number of relapses)',
      'Steroid medications (to treat acute relapses)',
    ],

    whenToConsultDoctor:
      "If you experience the unexplained symptoms mentioned above, consult a neurologist specializing in CNS disorders.",
  },

  'muscle-spasms': {
    title: "Muscle Spasms",

    description:
      "Muscle spasms are prolonged, involuntary muscle contractions due to abnormal nerve stimulation or muscle activity. They are common in the hands, feet, abdomen, arms, and thighs.",

    causes:
      "Causes include strenuous exercise, dehydration, stress, anxiety, fatigue, muscle pain, obesity, narrowing of arteries, and diabetes.",

    riskFactors: [
      'Elderly age',
      'Diabetes, Hypertension, or High cholesterol',
      'Athletes',
      'Obesity',
      'Pregnancy',
      'Stroke history or Anemia',
    ],

    symptoms: [
      'Pain',
      'Tremor',
      'Hard, tightened muscle',
      'Defective coordination',
    ],

    diagnosis: [
      'Medical history and physical examination',
      'Electromyography (EMG), CT Scan, MRI (if cause is unknown)',
      'Thyroid function test (TFT) and Complete Blood Count (CBC)',
    ],

    management: [
      'Prevention: stretching and hydrating before exertion',
      'Stretching and massaging the spasmed muscle gently',
      'Using an ice pack to cool the sore area',
      'Using a heating pad to relax the tightened muscle',
    ],

    whenToConsultDoctor:
      "Spasms usually resolve within minutes/hours. Consult a doctor if you experience frequent and persistent painful muscle spasms.",
  },

  'nasal-congestion': {
    title: "Nasal Congestion",

    description:
      "Nasal congestion (stuffy nose) is a common symptom of minor or major health problems, most frequently the common cold or a sinus infection.",

    causes:
      "Short-term congestion is usually cold-related. Long-term causes include allergies, deviated nasal septum, environmental irritants, chronic sinusitis, nasal polyps, hay fever, chemical exposures, hormonal fluctuations, and the first trimester of pregnancy.",

    riskFactors: [
      'Deviated nasal septum or Nasal polyps',
      'Dental infections',
      'Asthma or Allergies',
      'Aspirin sensitivity',
      'Frequent exposure to smoke or irritants',
    ],

    symptoms: [
      'Runny or stuffy nose',
      'Nasal pain and irritation',
      'Headache',
      'Mucus accumulation and swollen nasal tissues',
      'Red or irritated eyes',
      'Fatigue',
    ],

    diagnosis: [
      'Physical exam and assessment of symptoms by a doctor or ENT specialist',
    ],

    management: [
      'Avoiding exposure to irritants/pollutants',
      'Prescribed medicines and Saline sprays',
      'Using Humidifiers and Steam',
      'Keeping the head elevated (e.g., on a pillow) to promote mucus drainage',
    ],

    whenToConsultDoctor:
      "Consult a doctor if congestion lasts >10 days, is accompanied by high fever for >3 days, discharge is green/abnormal with sinus pain, or if you have a weak immune system, asthma, or emphysema.",
  },

  'nausea': {
    title: "Nausea",

    description:
      "Nausea is an uneasy, unsettling sensation recognized as an urge to vomit. While painless, it causes discomfort in the chest, upper abdomen, and throat. It usually precedes vomiting and is a manifestation of underlying disturbances.",

    causes:
      "Causes include bacterial/viral infections (food poisoning), pregnancy, acidity/heartburn, certain medicines (cancer drugs), long-standing stomach ulcers, seasickness/motion sickness, menstruation, migraines, heavy meals/overeating, staying empty-stomached, or eating allergic/bad-tasting food.",

    riskFactors: [
      'Post-surgery recovery',
      'Meningitis and brain injuries',
      'Vertigo',
      'Long-standing liver disease and liver cancer',
      'Intestinal obstruction',
      'Heart attacks',
    ],

    symptoms: [
      'Altered taste and dry mouth',
      'Chest heaviness',
      'Increased pulse rate and sweating',
      'Stomach ache',
      'Low blood pressure, dizziness, and fainting',
    ],

    diagnosis: [
      'Detailed medical history (assessing duration, intensity, frequency, and triggers)',
      'Blood tests and laboratory investigations',
    ],

    management: [
      'Anti-nausea tablets before traveling (for motion sickness)',
      'Painkillers for migraines',
      'Eating healthy cereals, fruits in smaller portions',
      'Exercising regularly and not lying down right after eating',
      'Avoiding greasy/spicy foods, smoking, or foul smells',
      'Taking mint or fennel seeds',
    ],

    whenToConsultDoctor:
      "See a doctor immediately if nausea is accompanied by uncontrolled vomiting and low blood pressure (risk of shock), or if it prevents you from eating/drinking for over 12 hours.",
  },

  'nodular-acne': {
    title: "Nodular Acne",

    description:
      "Nodular acne is a severe form of acne involving the Cutibacterium acnes bacteria. It affects deeper skin layers, causing large, inflamed, solid lumps (nodules) or pus-filled cysts without a 'head'. They are very painful and do not clear with typical over-the-counter medications.",

    causes:
      "Caused by overactive sebaceous (oil) glands, abnormal buildup of dead cells in the pore, overgrowth of acne-causing bacteria, and androgen hormones altering oil chemistry.",

    riskFactors: [
      'Teenage boys and young adult males',
      'Adult women (often induced around menstrual periods or pregnancy)',
      'Genetics (family history of nodular acne)',
      'Certain medications (corticosteroids, lithium, phenytoin)',
      'High carbohydrate/glycemic diets',
      'Greasy cosmetics, tight clothing, excessive sweating, and friction',
      'Stress',
    ],

    symptoms: [
      'Nodules (solid, painful, large lumps deep under the skin)',
      'Cysts (pus-filled, painful lumps deep under the skin)',
      'Inflamed, red, and swollen skin over the breakouts',
    ],

    diagnosis: [
      'Clinical evaluation by a dermatologist to assess severity and underlying causes',
    ],

    management: [
      'Oral antibiotics combined with topical therapy',
      'Oral contraceptives (for women)',
      'Oral isotretinoin (Vitamin A derivatives)',
      'Steroid injections (to reduce pain and scarring)',
      'Surgical draining of cysts in some cases',
    ],

    whenToConsultDoctor:
      "Schedule an appointment with a dermatologist if you experience persistent papules, severe inflamed/red bumps, or extremely painful deep breakouts.",
  },

  'non-alcoholic-fatty-liver': {
    title: "Non-Alcoholic Fatty Liver",

    description:
      "Non-Alcoholic Fatty Liver is a condition characterized by the accumulation of fat in the liver, often occurring in overweight or obese individuals.",

    causes:
      "Causes include obesity/overweight, insulin resistance, hyperglycemia (high blood sugar), and raised amounts of cholesterol and fatty acids in the blood.",

    riskFactors: [
      'High cholesterol and triglyceride levels',
      'Metabolic Syndrome and Obesity',
      'Type 2 diabetes',
      'Polycystic Ovary Syndrome (PCOS)',
      'Hypothyroidism and Hypopituitarism',
      'Sleep cycle disturbances',
    ],

    symptoms: [
      'Fatigue',
      'Pain or discomfort in the upper right abdomen',
      'Abdominal swelling',
      'Enlarged blood vessels beneath the skin’s surface',
      'Red palms',
      'Jaundice (yellowing of the skin and eyes)',
    ],

    diagnosis: [
      'Physical examination and symptom check',
      'CT Scan and MRI',
      'Liver Function Tests and Lipid Profile blood tests',
    ],

    management: [
      'Regular use of prescribed medicines',
      'Healthy diet and weight loss',
      'Exercise and general lifestyle changes',
    ],

    whenToConsultDoctor:
      "Early diagnosis leads to effective treatment. See a doctor if symptoms do not improve within 10 days, or if you experience upper abdominal pain and jaundice.",
  },

  'nutritional-deficiencies': {
    title: "Nutritional Deficiencies",

    description:
      "Nutritional deficiencies occur when the diet lacks essential nutrients (like Iron, Calcium, Vitamins A, B, C, D), affecting growth, nourishment, and increasing disease risk.",

    causes:
      "Causes include poor dietary intake, maternal deficiency affecting breastfed infants, malabsorption disorders (Crohn's, celiac, colon cancer), side effects of medicines (metformin, antacids), alcohol abuse, pregnancy demands, poverty, and gastrointestinal surgery.",

    riskFactors: [
      'Pregnant and nursing females',
      'Children and the elderly',
      'Pre-existing conditions (e.g., AIDS, malabsorption diseases)',
    ],

    symptoms: [
      'Pale skin, eyes, and nails (Iron deficiency)',
      'Difficulty breathing, weakness, laziness, and low energy',
      'Poor concentration, dizziness, forgetfulness, and poor memory',
      'Droopy eyelids and dull eyes',
      'Dry skin (Vitamin B3 deficiency)',
      'Painful bones/joints and weak teeth (Calcium/Vitamin D deficiency)',
      'Bleeding gums (Vitamin C deficiency)',
      'Hair loss, muscle wasting, and constipation',
      'Palpitations and irregular/heavy menstrual cycles',
    ],

    diagnosis: [
      'Thorough history of diet and eating habits',
      'Physical examination of skin, nails, eyes, tongue, abdomen, and posture',
      'Blood tests for anemia, Vitamin D, and Calcium levels',
    ],

    management: [
      'Increased nutrient-rich dietary intake',
      'Targeted vitamin and mineral supplements',
    ],

    whenToConsultDoctor:
      "Consult a doctor if symptoms persist or worsen after months of treatment. Do not increase supplement doses without consulting a professional.",
  },

  'obesity': {
    title: "Obesity",

    description:
      "Obesity is a condition where excess body fat puts your health at risk (BMI greater than 30). It leads to severe complications like heart problems, type 2 diabetes, and osteoarthritis.",

    causes:
      "Caused by consuming too many calories with a lack of exercise, genetic predispositions, poor diets (high fat, overeating, odd hours), stress/depression, certain medicines (corticosteroids, antidepressants), and hormonal disturbances (hypothyroidism, Cushing’s disease).",

    riskFactors: [
      'Genetics and family history',
      'Sedentary lifestyle',
      'Unhealthy diets and psychological stress',
      'Underlying medical conditions',
    ],

    symptoms: [
      'Increased waist size and unhealthy body fat distribution',
      'Breathlessness, especially during physical activity',
      'Feeling tired, lethargic, and experiencing back aches',
      'Low confidence or self-esteem',
      'Increased risk of Type 2 Diabetes, High blood pressure, High cholesterol, Osteoarthritis, and Heart Disease',
    ],

    diagnosis: [
      'Medical history and lifestyle examination',
      'Calculating Body Mass Index (BMI)',
      'Measuring waist circumference',
      'Blood tests to check cholesterol, blood sugar, hormones, and liver function',
    ],

    management: [
      'Healthy diet: tracking meals, cutting calories/fats, portion control, increasing fruits/vegetables and water',
      'Exercise: consistent cardiovascular and strength training',
      'Medicines (if BMI > 30): Bupropion, liraglutide, lorcaserin, orlistat, or phentermine (under strict doctor supervision)',
      'Surgery (if BMI > 40): Gastric band, bypass, or sleeve procedures',
    ],

    whenToConsultDoctor:
      "Consult a doctor if you experience complications of obesity or if you cannot lose weight despite diet and exercise modifications.",
  },

  'oral-ulcers': {
    title: "Oral Ulcers",

    description:
      "Oral ulcers are slow-healing, recurring sores that develop on the mucous membranes of the mouth (tongue, lips, inner cheeks, floor of the mouth). They can occur alone or as a symptom of an underlying disease.",

    causes:
      "Causes include accidental biting, toothbrush injury, rubbing against misaligned teeth/braces/dentures, poor oral hygiene, hot food burns, harsh mouthwashes, stress, hormonal changes, food allergies, viral/bacterial/fungal infections, radiation, and excess tea/coffee/alcohol.",

    riskFactors: [
      'Immune deficiencies (HIV, tuberculosis, mononucleosis)',
      'Diabetes',
      'Decreased saliva production (dry mouth)',
      'Undergoing radio- or chemotherapy',
      'Nutritional deficiencies (Vitamin B12, iron, folic acid)',
    ],

    symptoms: [
      'Tenderness and pain at the ulcer site',
      'Difficulty in eating, leading to overall weakness',
      'Swollen skin around the affected area',
      'Sensitivity to hot, salty, and spicy foods',
      'Limited mouth opening',
    ],

    diagnosis: [
      'Examination of the mouth for infections and assessing tooth bite',
      'Complete medical history to identify underlying diseases or medicinal triggers',
    ],

    management: [
      'Avoiding spicy/acidic/crunchy trigger foods',
      'Maintaining proper dental hygiene and using soft toothbrushes',
      'Applying ice cubes and rinsing with salt water',
      'Using OTC oral pain relievers and gels',
      'Minimizing stress and drinking plenty of water',
    ],

    whenToConsultDoctor:
      "Consult a doctor if ulcers don't heal within 3 weeks, start bleeding, multiply rapidly, are accompanied by high fever/diarrhea, or if new ulcers appear before old ones heal.",
  },

  'organ-rejection-prophylaxis': {
    title: "Organ Rejection Prophylaxis",

    description:
      "Organ rejection occurs when the recipient’s immune system attacks a newly transplanted organ, recognizing its antigens as foreign. Prophylaxis refers to the medicines and protocols used before and after transplantation to suppress this immune response and prevent rejection.",

    causes:
      "Caused by the recipient's immune system naturally recognizing the transplanted organ's cellular antigens as foreign bodies and launching an attack to eliminate them.",

    riskFactors: [
      'Racial and gender differences between donor and recipient',
      'Receiving an organ from a deceased donor',
      'Repeated organ transplants',
      'Different blood groups',
      'Age of the recipient and primary disease severity',
      'Prior blood transfusions or immunizations',
      'Cytomegalovirus infections',
    ],

    symptoms: [
      'Impaired function of the transplanted organ',
      'General discomfort, malaise, and fatigue',
      'Pain, tenderness, or swelling over the transplanted organ',
      'Fever (pyrexia) with shivers and chills',
      'Body ache, nausea, and cough',
      'Weight changes and high blood sugar',
      'Yellowing of skin (jaundice)',
      'Impaired urination and dyspnea (difficulty breathing)',
    ],

    diagnosis: [
      'Thorough medical history and symptom tracking',
      'Blood tests (glucose, cholesterol, liver function)',
      'Close monitoring of organ-specific vital signs',
    ],

    management: [
      'Administering immunosuppressant medicines before and after the procedure',
      'Ensuring close blood group matches prior to transplant',
      'Strict, continuous monitoring of vital signs and laboratory parameters',
    ],

    whenToConsultDoctor:
      "Consult a doctor immediately if the newly transplanted organ functions poorly, your condition worsens, or you experience severe side effects from immunosuppressants.",
  },

  'osteoarthritis': {
    title: "Osteoarthritis",

    description:
      "Osteoarthritis (OA) is a chronic, degenerative joint condition affecting small and large joints (hands, knees, hips, spine). It causes the cartilage to become stiff and wear down, destroying its shock-absorbing ability and causing irreversible joint damage.",

    causes:
      "Causes include heredity, obesity, joint injury, overuse, aging, poor posture, and secondary effects from other diseases like rheumatoid arthritis.",

    riskFactors: [
      'Modifiable: Obesity, low calcium intake, repetitive joint stress (occupational posture), lack of/excessive activity, sports injuries',
      'Non-modifiable: Old age, female gender (post-menopause), genetics/family history, birth defects, bleeding disorders (hemophilia), avascular necrosis',
    ],

    symptoms: [
      'Pain when walking or moving the joint',
      'Swelling and tenderness after slight activity',
      'Stiffness (especially after sitting long or waking up)',
      'Hard lumps (bone spurs) felt near the joint',
      'Limited movement and grating sounds on movement',
      'Backache limiting daily activities',
    ],

    diagnosis: [
      'Physical examination of joint appearance and movement',
      'Blood tests and joint-fluid tests to rule out rheumatoid arthritis/gout',
      'X-Rays (showing thinning cartilage and bone spurs) and MRI',
    ],

    management: [
      'Weight reduction, yoga, and gentle exercise',
      'Dietary changes: Vitamin C, D, Calcium, antioxidants, turmeric, and ginger',
      'Medicines: Acetaminophen and NSAIDs for pain/inflammation',
      'Surgery: Joint replacement, bone realignment, or corticosteroid/lubricant injections',
    ],

    whenToConsultDoctor:
      "Consult a doctor if joint stiffness and pain do not respond to pain-relieving medicines, symptoms worsen, or you feel general discomfort and fatigue.",
  },

  'osteoporosis': {
    title: "Osteoporosis",

    description:
      "Osteoporosis is a progressive skeletal disease characterized by a severe decrease in bone mass and density. The imbalance between bone production and destruction makes bones brittle, porous, and highly vulnerable to fractures (commonly hips, spine, wrists).",

    causes:
      "Causes include genetics/family history, cystic fibrosis, osteogenesis imperfecta, Vitamin C/D deficiency, malnutrition, alcohol abuse, smoking, certain medicines (corticosteroids, anticonvulsants), abnormal thyroid levels, Type 1 Diabetes, and Celiac disease.",

    riskFactors: [
      'Advancing age and Female gender (especially post-menopause due to estrogen drop)',
      'Family history of osteoporosis',
      'Short stature',
      'Sedentary lifestyle',
      'Smoking and alcohol abuse',
      'Long-term use of anti-seizure meds or corticosteroids',
      'Malnutrition',
    ],

    symptoms: [
      'Often asymptomatic initially until a fracture occurs',
      'Muscular aches and pains (neck/back)',
      'Muscle tenderness and severe backache',
      'Frequent bone fractures from minor falls',
      'Leaned down/stooped posture',
      'Loss of height',
    ],

    diagnosis: [
      'Complete medical history and physical exam',
      'Bone mineral density scan (DEXA scan)',
      'Ultrasound scan of the heel',
    ],

    management: [
      'Lifestyle modifications: calcium-rich diet, exercise, quitting smoking/alcohol',
      'Drug therapy: Bisphosphonates, Monoclonal antibodies, Hormone replacement therapy',
      'Surgery: Vertebroplasty or Kyphoplasty to stabilize bones and correct spinal curvature',
    ],

    whenToConsultDoctor:
      "Consult your doctor immediately if you have persistent back pain, fever, numbness in genitals/legs/feet, loss of bladder/bowel control, or worsening of the condition.",
  },

  'ovarian-cancer': {
    title: "Ovarian Cancer",

    description:
      "Ovarian cancer involves the abnormal division and multiplication of cells in the ovaries, forming tumors. If left undetected, it spreads to other body parts and can be fatal. It is often asymptomatic in early stages.",

    causes:
      "There are no singular known causes, but it develops from DNA mutations in ovarian cells that lead to uncontrolled rapid multiplication.",

    riskFactors: [
      'Advancing age',
      'Family history of ovarian or breast cancer',
      'Genetic mutations (BRCA 1 and BRCA 2)',
      'Early menstruation (before age 12) or late menopause (after age 50)',
      'Infertility and Polycystic Ovarian Syndrome (PCOS)',
      'Increased weight and Smoking',
      'Talc exposure',
    ],

    symptoms: [
      'Abdominal bloating or swelling',
      'Quickly feeling full when eating',
      'Weight loss and fatigue',
      'Pelvic discomfort and back pain',
      'Constipation and increased urination',
      'Menstrual irregularities',
      'Heartburn and painful intercourse',
    ],

    diagnosis: [
      'Detailed medical and family history',
      'Thorough abdominal and pelvic examination',
      'Abdominal and pelvic CT scans',
      'Biopsy of ovarian tissue',
    ],

    management: [
      'Conventional: Surgical removal of cancer tissues, Chemotherapy, and Radiation therapy',
      'Complementary: Meditation, relaxation, massage, and Biofeedback therapy',
    ],

    whenToConsultDoctor:
      "Consult an Endocrinologist or gynecologist if you experience the above symptoms or unexplained menstrual irregularities.",
  },

  'pain': {
    title: "Pain",

    description:
      "Pain is a distressing physical or emotional sensation that serves as a warning of disease or bodily threat. It can be acute (short-term from injury/surgery) or chronic (lasting months/years, neurogenic, psychogenic). It helps in diagnosing underlying issues.",

    causes:
      "Acute causes: injuries, surgery, cuts, muscle strains, menstrual cramps, tooth impaction. Chronic/Systemic causes: Rheumatoid arthritis, Lupus, Myasthenia gravis, Gout, Osteoarthritis, Ankylosing spondylitis.",

    riskFactors: [
      'Old age and Obesity',
      'Genetics and Race',
      'Previous injuries or childhood trauma',
      'Stress and Smoking',
      'Physical overexertion at work',
      'Malnutrition',
    ],

    symptoms: [
      'Restlessness, crying, moaning, and groaning',
      'Grimacing and withdrawing from touch',
      'Resistance to care and reduced social interactions',
      'Increased wandering and sleeping problems',
      'Loss of appetite',
    ],

    diagnosis: [
      'Patient descriptions based on pain scales',
      'Assessing character (burning, stabbing), site, radiation, and triggers',
      'Tracking timing and impact on daily functions',
    ],

    management: [
      'Pain-relieving medicines',
      'Physical therapies (heat/cold packs, exercise)',
      'Psychological therapies (CBT, meditation)',
      'Acupuncture, occupational therapy, and support groups',
    ],

    whenToConsultDoctor:
      "Consult a doctor if pain worsens, doesn't improve, causes general uneasiness, or if medications trigger new side effects.",
  },

  'parasitic-infections': {
    title: "Parasitic Infections",

    description:
      "Parasitic infections are invasive diseases caused by microorganisms (parasites) that live inside a host and steal its nutrition. Categories include Protozoan (single-celled like Giardia), Helminthic (worms like tapeworms, roundworms), and Ectoparasites (mosquitoes, fleas, mites).",

    causes:
      "Caused by exposure to contaminated food, water, waste, soil, or bites from infected insects (e.g., mosquitoes carrying Malaria).",

    riskFactors: [
      'Unhygienic lifestyles (poor hand sanitation, unclean cooking)',
      'Immunocompromised states',
      'Lack of clean drinking water and eating unwashed raw produce',
      'Swimming in contaminated lakes/ponds',
      'Constant contact with soil/dirt (common in playing children)',
      'Stagnant water breeding mosquitoes',
    ],

    symptoms: [
      'Ascariasis (Roundworm): Coughing, wheezing, abdominal pain, vomiting, diarrhea, worms in stool',
      'Malaria: Chills, high-grade fever, body ache',
      'Trichomoniasis: Genital itching, redness, irritation, discharge',
      'Giardiasis: Diarrhea, gases, greasy stools, dehydration',
      'Toxoplasmosis: Flu-like symptoms, swollen lymph nodes, muscle pain (dangerous in pregnancy)',
      'Ancylostomiasis (Hookworm): Skin rash, abdominal pain, diarrhea, weight loss, anemia',
    ],

    diagnosis: [
      'Blood tests (CBC, Malarial Parasite test)',
      'Stool tests for worms and eggs',
      'Endoscopy or colonoscopy if stool tests are inconclusive',
      'X-rays, MRI, and CT scans to assess organ damage',
    ],

    management: [
      'Prevention: Washing hands/produce, boiling water, safe sex, eliminating stagnant water',
      'Anti-malarial drugs (for malaria)',
      'Antihelmintic drugs (for worm infections)',
      'Antibiotics (for certain protozoa)',
    ],

    whenToConsultDoctor:
      "Consult a doctor if fevers and severe diarrhea associated with the infection worsen and do not improve with initial treatment.",
  },

  'parkinsons': {
    title: "Parkinson's",

    description:
      "Parkinson’s disease is a progressive neurodegenerative disorder of the central nervous system that primarily affects movement. It involves the degeneration of dopamine-producing neurons in the substantia nigra, leading to severe motor control issues. It is highly common in old age.",

    causes:
      "Also known as idiopathic parkinsonism, exact causes are unclear. Contributing factors include genetics/gene mutations, environmental triggers (toxins like manganese, pesticides), and drug-induced onset (Phenothiazine, Metoclopramide).",

    riskFactors: [
      'Age (usually develops after 60 years of age)',
      'Male gender (twice as likely as females)',
      'Farming and pesticide interaction',
      'Severe head injuries',
    ],

    symptoms: [
      'Tremors occurring at rest',
      'Rigidity or stiffness of the limbs',
      'Bradykinesia (very slow movements)',
      'Mask-like, expressionless face',
      'Balance and posture difficulties leading to frequent falls',
      'Short, rapid walking steps and difficulty initiating movement',
      'Trouble sleeping, swallowing, and urinating',
    ],

    diagnosis: [
      'Neurological examination checking muscle rigidity, balance, and movement',
      'Blood tests and CT scans to rule out strokes/tumors',
      'SPECT and Genetic testing',
    ],

    management: [
      'Levodopa (usually with Carbidopa)',
      'Dopamine agonists (Pramipexole, rotigotine)',
      'Atypical dopamine agonists (Amantadine)',
      'COMT inhibitors (tolcapone)',
      'Physical adaptation: avoiding sudden moves, stepping heel-first, taking wide U-turns to avoid falls',
    ],

    whenToConsultDoctor:
      "Consult a doctor if medication side effects become intolerable, symptoms worsen, or if you develop depression, sexual dysfunction, incontinence, or impaired memory.",
  },

  'parkinsons-disease': {
    title: "Parkinson's Disease",

    description:
      "Parkinson’s is a progressive disease that mostly affects people over the age of 60. In this disease, the nerve cells that control body movement are damaged, leading to difficulty in movement, tremors, and stiffness.",

    causes:
      "The exact cause remains unclear, but it is driven by the degeneration of cells as a part of age changes and underlying genetic factors.",

    riskFactors: [
      'Advancing age',
      'Family history and genetics',
      'Male gender',
      'Exposure to toxins in factories or farms',
      'Previous head injuries',
    ],

    symptoms: [
      'Resting tremors',
      'Limb rigidity and stiffness',
      'Very slow movements',
      'Expressionless (mask-like) face',
      'Difficulty in balance, posture, and initiating walking',
      'Trouble sleeping and swallowing',
      'Involuntary urination',
    ],

    diagnosis: [
      'Clinical check of muscle rigidity, balance, and movement',
      'Blood tests and CT scans to rule out tumors/strokes',
      'SPECT scans and genetic testing',
    ],

    management: [
      'Levodopa/Carbidopa',
      'Dopamine agonists (Pramipexole, ropinirole)',
      'Amantadine and COMT inhibitors',
      'Lifestyle modifications to prevent falls and ease movement',
    ],

    whenToConsultDoctor:
      "Consult a doctor if the treatment loses effectiveness, side effects are severe, or if you experience depression, urinary problems, or cognitive decline.",
  },

  'pentasomy-x-disorder': {
    title: "Pentasomy X Disorder",

    description:
      "Pentasomy X disorder is a rare chromosomal disorder affecting females, characterized by the presence of five X chromosomes (49,XXXXX) instead of two. It severely affects physical and mental development and occurs due to random errors during reproductive cell division.",

    causes:
      "Caused by random errors during the division of reproductive cells in one of the parents or early embryonic development, leading to three extra X chromosomes.",

    riskFactors: [
      'Random chromosomal nondisjunction event (no specific preventable risk factors)',
    ],

    symptoms: [
      'Physical: Short height, flat nasal bridge, epicanthal folds, high arched palate, curved fingers, hypermobility of joints',
      'Developmental: Mild to severe intellectual disabilities, delayed speech, difficulty walking',
      'Health Issues: Heart and kidney problems, delayed puberty, frequent infections from a weak immune system',
      'Behavioral: Hyperactivity, social interaction difficulties, emotional challenges',
    ],

    diagnosis: [
      'Karyotyping (genetic testing to analyze chromosomal composition and confirm the 49,XXXXX pattern)',
    ],

    management: [
      'Educational Support: Special education, speech, occupational, and physical therapy',
      'Medical Management: Regular check-ups for cardiac/renal conditions, hormone therapy for delayed puberty',
      'Psychological Support: Therapy for emotional and social challenges',
    ],

    whenToConsultDoctor:
      "This is a lifelong genetic condition requiring a multi-disciplinary medical team from infancy to manage symptoms and improve quality of life.",
  },

  'peptic-ulcers': {
    title: "Peptic Ulcers",

    description:
      "Peptic ulcers are open, slow-healing sores that develop on the lining of the stomach (gastric ulcers) or the top end of the small intestine (duodenal ulcers). They may be symptomatic, asymptomatic, or recurrent.",

    causes:
      "Causes include Helicobacter pylori bacterial infections, prolonged intake of NSAIDs (aspirin, ibuprofen), intake of steroids/antidepressants, and smoking.",

    riskFactors: [
      'Smoking and Alcoholism',
      'Emotional stress',
      'Eating spicy foods',
      'Older age',
      'Excessive intake of aspirin and pain-relievers',
    ],

    symptoms: [
      'Burning stomach pain and heartburn',
      'Feeling of fullness, bloating, and intolerance to fatty foods',
      'Nausea and vomiting (potentially with blood)',
      'Dark blood in stools',
      'Trouble breathing and lethargy',
      'Unexplained weight loss and appetite changes',
    ],

    diagnosis: [
      'Detailed medical history and physical exam',
      'Endoscopy',
      'Fecal antigen and urea breath test for H. pylori',
    ],

    management: [
      'Antibiotics (if caused by H. pylori)',
      'Acid-blocking medications and antacids',
      'Medicines that protect the stomach/intestinal lining',
    ],

    whenToConsultDoctor:
      "Consult a doctor if pain persists despite medication, ulcers start bleeding, symptoms last over 3 weeks, you completely lose your appetite, or you feel severe malaise.",
  },

  'pernicious-anemia': {
    title: "Pernicious Anemia",

    description:
      "Pernicious anemia is a condition in which Vitamin B12 is deficient. It is mainly caused by an autoimmune process that destroys parietal cells, making the body unable to produce 'intrinsic factor', which is necessary for B12 absorption.",

    causes:
      "Caused by a lack of Vitamin B12 absorption due to autoimmune destruction of stomach cells, or a lack of B12 in the diet (meat, eggs, dairy).",

    riskFactors: [
      'Family history of the disease',
      'Having parts of the stomach or small intestine surgically removed',
      'Diseases like Crohn’s disease or HIV',
      'Following a strict vegetarian or vegan diet',
    ],

    symptoms: [
      'Weakness and Fatigue',
      'Chest pain and Headaches',
      'Pale skin',
      'Weight loss',
    ],

    diagnosis: [
      'Complete Blood Count (CBC)',
      'Tests for Intrinsic Factor (IF) and parietal cell antibodies',
      'Vitamin B12 level blood test',
    ],

    management: [
      'Vitamin B12 injections',
      'Continuous blood level monitoring over the course of therapy',
    ],

    whenToConsultDoctor:
      "Consult your doctor when side effects or anemia symptoms worsen.",
  },

  'pharyngitis': {
    title: "Pharyngitis",

    description:
      "Pharyngitis is the medical term for inflammation of the pharynx, commonly referred to as a 'sore throat'. It is characterized by discomfort, pain, scratchiness, and difficulty swallowing, mostly occurring during the winter season.",

    causes:
      "Caused by viral and bacterial infections, including Measles, Adenovirus (common cold), Chickenpox, Croup, Whooping cough, Group A streptococci (Strep throat), Influenza, and Mononucleosis.",

    riskFactors: [
      'Repeated exposure to cold and flu',
      'Frequent allergic reactions and Sinusitis',
      'Exposure to secondhand smoke or active smoking',
      'Working in healthcare facilities or frequenting crowded places',
      'Weakened immune system and Winter season',
    ],

    symptoms: [
      'Discomfort, pain, and scratchiness in the throat',
      'Sneezing, runny nose, and cough',
      'Headache, fatigue, and weakness',
      'Fever accompanied by chills',
      'Swollen lymph nodes and unusual taste',
      'Loss of appetite, joint pain, and rash',
    ],

    diagnosis: [
      'Medical history and physical examination of the throat and lymph nodes',
      'Throat culture swab',
      'Complete Blood Count (CBC)',
    ],

    management: [
      'Drinking plenty of water and saltwater gargles',
      'Nebulizing and resting',
      'Over-the-counter painkillers',
      'Antibiotics for 7-10 days (if the cause is bacterial)',
    ],

    whenToConsultDoctor:
      "Consult a doctor if symptoms persist for several days, if accompanied by a high fever, swollen lymph nodes, rash, or if you start experiencing trouble breathing.",
  },
  'plaque-psoriasis': {
    title: "Plaque Psoriasis",

    description:
      "Plaque Psoriasis is a chronic autoimmune disorder in which the body starts attacking its own cells. It usually forms patches of thick, red, and crusty skin. Other forms include Nail Psoriasis, Guttate Psoriasis (often due to strep infections), Pustular Psoriasis, Erythrodermic Psoriasis, and Psoriatic Arthritis.",

    causes:
      "Plaque Psoriasis is an autoimmune disease that causes the body to attack its own cells. The skin cells regenerate at a rate much greater than normal, leading to the formation of patchy red scales. Exact underlying causes are still being researched.",

    riskFactors: [
      'Infections, such as skin and throat infections',
      'Weather, such as cold and dry conditions',
      'Skin injury, such as a scrape or bug bite',
      'Smoking and excessive alcohol consumption',
      'Exposure to skin allergens',
      'Certain medications, such as lithium',
      'Rapid withdrawal from certain medicines, such as corticosteroids',
      'Family history and stress',
    ],

    symptoms: [
      'Red skin patches covered with thick, silvery scales',
      'Small dried or scaly spots',
      'Dry, crackled skin',
      'Itchy skin that may bleed',
      'Pitted, thickened, or rigged nails',
      'Swollen, stiff joints',
    ],

    diagnosis: [
      'Physical examination of the skin and relevant symptoms by a doctor or dermatologist',
      'Lab tests or skin biopsy (specimen obtained surgically)',
    ],

    management: [
      'Regular and directed use of prescribed medicines',
      'Corticosteroids, which help calm inflammation',
      'Vitamin D analogs',
      'Retinoids',
      'Light therapy',
    ],

    whenToConsultDoctor:
      "Early diagnosis can lead to effective and successful treatment. If your symptoms do not improve within a few days, or you experience any of the symptoms mentioned above, please see a doctor.",
  },

  'post-menopausal-syndrome': {
    title: "Post-Menopausal Syndrome",

    description:
      "Menopause is the permanent cessation of menstruation resulting in the loss of ovarian follicle development. Post-menopausal syndrome refers to the time after menopause. A lower level of estrogen puts women at risk for other health conditions like heart diseases and osteoporosis. Menopause usually starts at the age of 50-55.",

    causes:
      "It is a natural biological process caused by the aging of the ovaries and the resulting decrease in estrogen levels.",

    riskFactors: [
      'Physical inactivity',
      'Obesity',
      'Hypertension',
      'Hypercholesterolemia',
      'Low calcium intake',
      'Smoking',
    ],

    symptoms: [
      'Hot flashes and night sweats (waking up drenched in sweat)',
      'Irritability and mood swings',
      'Weight gain',
      'Foggy brain and headaches',
      'Vaginal dryness',
      'Breast soreness',
    ],

    diagnosis: [
      'Symptom assessment to confirm menopausal transition',
      'Blood tests (under certain circumstances) to check Follicle Stimulating Hormone (FSH), Estrogen, and Thyroid Stimulating Hormone (TSH)',
    ],

    management: [
      'Cool hot flashes (dress in layers, have cold water, avoid triggers like spicy foods, caffeine, alcohol)',
      'Get enough sleep (avoid caffeine/alcohol before bed, exercise during the day)',
      'Decrease vaginal discomfort (use water/silicone-based lubricants without glycerine, stay sexually active)',
      'Strengthen pelvic floor (Kegel exercises)',
      'Eat a balanced diet (vegetables, fruits, whole grains) and consider Vitamin D/Calcium supplements',
      'Don’t smoke and exercise regularly',
      'Practice relaxation techniques (deep breathing, massage)',
    ],

    whenToConsultDoctor:
      "It is important to get regular check-ups and screening tests including breast exams, mammograms, pelvic exams, and pap smears. Consult your doctor to be guided accordingly.",
  },

  'postpartum-hemorrhage': {
    title: "Postpartum Hemorrhage",

    description:
      "When a woman loses too much blood (more than 500-1000ml) after giving birth, it is termed postpartum hemorrhage. It is a common reason behind maternal deaths.",

    causes:
      "Most cases are seen after a cesarean section, but vaginal delivery can also lead to it. Causes include lack of uterine contraction after delivery, infections from contaminated equipment, unremoved placenta tissue, uterine injury (forceps/vacuum use), and medicines taken to induce labor.",

    riskFactors: [
      'Bleeding disorders (problem with blood clotting)',
      'Pregnancy-related hypertension',
      'High birth weight of the child',
      'Extended labor time',
      'Multiple births (twins or triplets)',
      'Large incisions (episiotomy) given in the vagina',
    ],

    symptoms: [
      'Low blood pressure',
      'Increased pulse rate',
      'Abdominal pain and cramps',
      'Nausea and vomiting',
      'Decreased blood cell count',
      'Weakness and inability to stand unassisted',
    ],

    diagnosis: [
      'Measurement of blood loss via collection bags or number of pads changed',
      'Checking vitals (blood pressure, pulse rate, breathing)',
      'Blood samples to test for drop in blood count and hemoglobin levels',
    ],

    management: [
      'Removal of remaining placental tissue through scraping',
      'Stitches and cellulose sponges for uterine trauma',
      'Oxytocin injections to help uterine contraction',
      'Blood transfusions to retain blood loss and maintain fluid levels',
    ],

    whenToConsultDoctor:
      "Seeing your gynecologist throughout pregnancy helps monitor and prepare for risk factors like bleeding problems, unusual blood types, or pregnancy complications.",
  },

  'premenstrual-syndrome': {
    title: "Premenstrual Syndrome",

    description:
      "Pre-menstrual syndrome (PMS) is a disorder experienced by most females a few days before a menstrual period. It is a cyclical combination of physical, emotional, and behavioral effects that vary for every woman.",

    causes:
      "The exact cause is unknown, but contributing factors include hormonal changes during the menstrual cycle, chemical changes in the brain (fluctuations in serotonin causing mood changes), and underlying depression.",

    riskFactors: [
      'Women in their 20s and 30s',
      'Physical or emotional stress',
      'Increased caffeine intake and improper nutrition',
      'Personal or family history of depression',
    ],

    symptoms: [
      'Swollen and tender breasts, bloating, and weight gain',
      'Stomach cramping, fatigue, headache, or backache',
      'Intolerance to noise and light',
      'Irritability, feeling tired, and mood swings',
      'Appetite changes, sadness, worthlessness, sleep changes, and decreased sexual drive',
    ],

    diagnosis: [
      'Diagnosis is made by a doctor primarily on the basis of patient history, tracking symptoms over cycles.',
    ],

    management: [
      'Evening primrose oil for breast tenderness',
      'Anti-depressant medications (e.g., SSRIs)',
      'Over-the-counter pain killers (e.g., Ibuprofen)',
      'Combined oral contraceptive pills to regulate cycles',
      'Counseling',
    ],

    whenToConsultDoctor:
      "If the symptoms become so severe and frequent that they affect your everyday life, visit your doctor.",
  },

  'prevents-angina': {
    title: "Angina",

    description:
      "Angina is defined as pain or discomfort felt in the chest, resulting from decreased blood flow to the heart. Types include Stable Angina (triggered by activity/stress, resolves on rest), Unstable Angina (occurs at rest, warning sign of a heart attack), and Prinzmetal’s Angina (rare, painful spasms at rest).",

    causes:
      "Angina results from poor blood supply to the heart. Mechanisms include fat collection in vessels (atherosclerosis), clots blocking supply, or vessel spasms. Less common causes include pulmonary embolism, hypertrophic cardiomyopathy, aortic dissection, and aortic stenosis.",

    riskFactors: [
      'Un-modifiable: Male gender, Men over 45, Women over 55',
      'Modifiable: Obesity, high blood pressure, stress, lack of exercise, Type 2 diabetes, high cholesterol, smoking',
    ],

    symptoms: [
      'Aching, burning, squeezing, heaviness, fullness, or pressure in the chest',
      'Pain radiating to the jaw, shoulder, neck, arms, or stomach',
      'Pain usually lasts a few minutes and resolves on resting (for stable angina)',
    ],

    diagnosis: [
      'ECG, Chest X-ray, and tests for cardiac enzymes (troponin I or CPK-MB)',
      'Echocardiography',
      'Coronary angiogram or CT angiography',
      'MRI of the chest',
    ],

    management: [
      'Lifestyle modifications: healthy diet, smoking cessation, regular exercise',
      'Initial therapy: Nitroglycerin, Aspirin, Beta blockers, morphine sulfate, and oxygen maintenance',
      'Bypass surgery or angioplasty (if medication is ineffective)',
    ],

    whenToConsultDoctor:
      "If you feel chest pain or symptoms of a heart attack (shortness of breath, irregular heartbeat, sweating), call an ambulance. If symptoms don't improve within 5 minutes of taking nitroglycerin, call for help.",
  },

  'primary-biliary-cirrhosis': {
    title: "Primary Biliary Cirrhosis",

    description:
      "Primary Biliary Cirrhosis, now known as Primary Biliary Cholangitis (PBC), is an autoimmune disease of the liver. It causes gradual, progressive destruction of the small bile ducts, leading to the buildup of bile/toxins (Cholestasis) and eventual scarring (Cirrhosis).",

    causes:
      "The exact cause is unknown, but it is an autoimmune reaction where T-lymphocytes attack the liver’s healthy bile duct cells, leading to inflammation, fibrosis (scar tissue), and cirrhosis.",

    riskFactors: [
      'Female gender (women are at a higher risk)',
      'Age between 30-50 years',
      'Family history',
      'Infections',
      'Smoking',
      'Exposure to toxins',
    ],

    symptoms: [
      'Itchy skin and fatigue',
      'Dry eyes and mouth (Xerostomia)',
      'Pain in the upper right abdomen',
      'Swelling of the spleen, feet, and ankles',
      'Bone, muscle, or joint pain',
      'Nausea, vomiting, and fluid buildup in the abdomen',
      'Jaundice (yellowing of skin/eyes) and hyperpigmentation',
      'High cholesterol and osteoporosis',
    ],

    diagnosis: [
      'Physical examination and symptom check',
      'Liver function tests and cholesterol tests',
      'Antibody tests for signs of autoimmune disorders',
    ],

    management: [
      'Regular and directed use of prescribed medicines',
      'Antihistamines',
      'Corticosteroids',
      'Avoidance of triggering foods and allergens',
    ],

    whenToConsultDoctor:
      "Early diagnosis can lead to effective treatment. If your symptoms do not improve within a few days, or you experience upper abdomen pain, itching, and discomfort, please see a doctor.",
  },

  'prophylaxis-of-chickenpox': {
    title: "Chickenpox",

    description:
      "Chickenpox is an infectious disease that causes mild fever and itchy, inflamed, red pimples that turn into blisters and scabs. It occurs due to the Herpes Zoster Virus (Varicella-zoster) and mainly affects children. It can be prevented with the two-dose Varicella vaccine.",

    causes:
      "Occurs due to an infection by the Varicella-Zoster Virus (Herpes Zoster Virus) and mostly affects children.",

    riskFactors: [
      'Contact with chickenpox patients',
      'Individuals who have not been vaccinated against the virus',
    ],

    symptoms: [
      'Red and itchy patches over the skin',
      'Pain and headache',
      'High fever and fatigue',
      'Appetite changes',
    ],

    diagnosis: [
      'Physical examination of blisters and relevant symptoms',
      'Lab tests, such as blood tests or lesion sample tests',
    ],

    management: [
      'Regular use of medicines prescribed by a doctor',
      'Keep the patient cool and avoid scratching the blisters',
      'Take a cold shower every day',
    ],

    whenToConsultDoctor:
      "Early diagnosis leads to effective treatment. If you notice red, itchy blisters on your skin, please see a doctor immediately.",
  },

  'prostate-cancer': {
    title: "Prostate Cancer",

    description:
      "The prostate gland is part of the male reproductive system that produces seminal fluid. Prostate cancer occurs when abnormal cells survive, divide uncontrollably, and form tumors in the gland, potentially invading other tissues.",

    causes:
      "Caused by abnormal mutations in the DNA of prostate cells that lead to uncontrolled division and tumor formation.",

    riskFactors: [
      'Advancing age',
      'Ethnicity (increased risk in black African males)',
      'Family history (having a brother/father with the disease)',
      'Diet (high in animal fat or meat)',
    ],

    symptoms: [
      'Frequent urination',
      'Presence of blood in urine or semen',
      'Inability to get an erection',
      'Burning sensation when urinating',
      'Pain or stiffness in the lower back, hips, or thighs',
      'Being mostly tired and non-energetic',
    ],

    diagnosis: [
      'PSA Testing (measures prostate-specific antigen in the blood)',
      'Digital Rectal Exam (doctor feels the prostate gland through the rectal wall for lumps)',
    ],

    management: [
      'Early Stage: Close monitoring, radical prostatectomy, internal and external radiation',
      'Advanced Stage: Hormone therapy and chemotherapy',
      'Preventive measures: Healthy diet, regular exercise, stopping smoking, limiting alcohol, frequent ejaculation, yearly rectal exams (over age 40)',
    ],

    whenToConsultDoctor:
      "Don’t dismiss bedroom problems; erectile dysfunction may be a sign of prostate cancer or blocked arteries. Consult a medical professional if you experience any mentioned symptoms.",
  },

  'pruritus': {
    title: "Pruritus",

    description:
      "Pruritus is a skin condition characterized by severe itching and intense discomfort. It may occur on its own or as a sign of underlying skin diseases, involving a single body part or the entire body.",

    causes:
      "Causes include exposure to allergens (pollen, insect bites), skin conditions (Eczema, dry skin), irritating chemicals and cosmetics, parasites (worms, scabies), and certain cancers or treatments.",

    riskFactors: [
      'Frequent exposure to allergens',
      'Cancers',
      'Diabetes (raised sugar levels)',
      'Liver, kidney, and thyroid diseases',
      'Family history',
      'Unhygienic conditions or lifestyle',
    ],

    symptoms: [
      'Redness and pain',
      'Scratch marks and an urge to violently scratch',
      'Dry, cracked skin',
      'Leathery skin patches',
    ],

    diagnosis: [
      'Physical examination and symptom check',
      'Lab tests, such as blood tests',
    ],

    management: [
      'Regular use of prescribed medicines',
      'Application of cold compresses and moisturizers',
      'Taking lukewarm baths',
      'Avoiding scratching and skin irritants (such as furry clothes)',
    ],

    whenToConsultDoctor:
      "If your symptoms do not improve within a few days, or you experience severe scratching and pain, please see a doctor.",
  },

  'psoriasis': {
    title: "Psoriasis",

    description:
      "Psoriasis is a chronic, non-contagious, autoimmune skin disease causing rapid development of skin cells. This leads to plaques of thickened, scaly skin surrounded by inflammation/redness. Types include Plaque, Guttate, Pustular, Inverse, and Erythrodermic psoriasis.",

    causes:
      "Caused by immune system defects (T-cells mistakenly attacking skin cells) and genetics. Triggers include skin injuries, stress, anxiety, infections, and certain medicines (Hydroxychloroquine, Indomethacin).",

    riskFactors: [
      'Cardiovascular disease',
      'Metabolic syndrome',
      'Skin injury',
      'Family history of psoriasis',
    ],

    symptoms: [
      'Red, patchy skin with silvery scales',
      'Itchy, dry, and cracked skin',
      'Burning and soreness of the affected area',
      'Thickened, pitted, or ridged nails',
      'Swollen and stiff joints (Psoriatic arthritis)',
    ],

    diagnosis: [
      'Complete medical history and physical exam',
      'Skin biopsy to confirm diagnosis if unclear',
    ],

    management: [
      'Topical treatment: Salicylic acid, steroid creams, coal tar, Vitamin D3, Retinoids',
      'Phototherapy: UV light exposure',
      'Medicines: Methotrexate, Oral retinoids, Biologics (Adalimumab, brodalumab)',
    ],

    whenToConsultDoctor:
      "Consult your doctor immediately if there is unrelieved itching, joint swelling/tenderness, anxiety/depression, or symptoms of heart disease/diabetes.",
  },

  'psoriatic-arthritis': {
    title: "Psoriatic Arthritis",

    description:
      "Psoriatic Arthritis is a form of Psoriasis, a chronic autoimmune disorder. It usually results in swollen, painful joints accompanied by patches of thick, red, and crusty skin, often occurring secondary to a primary Psoriasis infection.",

    causes:
      "Occurs as a secondary complication of Psoriasis, an autoimmune disease where skin cells regenerate too quickly. The exact mechanism targeting the joints is still being researched.",

    riskFactors: [
      'Infections (skin and throat)',
      'Cold and dry weather conditions',
      'Skin injuries (scrapes, bug bites)',
      'Smoking and excessive alcohol consumption',
      'Exposure to skin allergens',
      'Certain medications (lithium) or rapid withdrawal from corticosteroids',
      'Family history and Stress',
    ],

    symptoms: [
      'Swollen, stiff joints and movement restrictions',
      'Foot pain and lower back pain',
      'Red skin patches covered with thick, silvery scales',
      'Small dried or scaly spots, and dry, cracked skin',
      'Itchy skin that may bleed',
      'Pitted, thickened, or rigged nails',
    ],

    diagnosis: [
      'Physical examination and symptom check by a dermatologist/doctor',
      'X-rays and Magnetic Resonance Imaging (MRI)',
    ],

    management: [
      'Regular use of prescribed medicines',
      'Non-steroidal Anti-inflammatory Medicines (NSAIDs)',
      'Disease-Modifying Anti-Rheumatic Drugs (DMARDs)',
      'Immunosuppressants and Biological agents',
    ],

    whenToConsultDoctor:
      "If symptoms do not improve within a few days or you experience joint pain alongside skin patches, see a doctor. If left untreated, it may cause significant joint damage.",
  },

  'psychosis': {
    title: "Psychosis",

    description:
      "Psychosis is a severe mental disorder in which thoughts and emotions are impaired, losing contact with reality. It involves personality changes, thought disorders, bizarre behavior, and hallucinations. Types include Schizophrenia, Bipolar disorder, Psychotic depression, Schizo-affective disorder, and Drug-induced psychosis.",

    causes:
      "Causes include genetics, head injuries, medical conditions, alcohol and psychoactive drugs, certain medications, brain tumors/cysts, dementia (Alzheimer's), and neurological illnesses (Parkinson's, Huntington's).",

    riskFactors: [
      'Family history of psychotic disorders',
      'Substance abuse',
      'Underlying neurological or medical conditions',
    ],

    symptoms: [
      'Difficulty concentrating and Depressed mood',
      'Sleeping too much or not enough',
      'Anxiety and Suspiciousness',
      'Reduced social drive and interaction',
      'Hallucinations and Paranoia',
      'Emotional changes and Irritability',
      'Self-injurious behavior (suicide) or overt hostility (abusiveness/assault)',
    ],

    diagnosis: [
      'Psychiatric evaluation (watching behavior, asking questions)',
      'EEG to examine brain electrical activity',
      'CT scan or MRS (MRI) to check for tumors, cysts, or infections',
      'Blood tests for genetic infections/diseases',
      'Neurophysiologic testing (speech, memory, thinking)',
      'Biological tests to exclude substance abuse or toxins',
    ],

    management: [
      'Antipsychotics (to reduce symptoms of psychosis)',
      'Mood stabilizing medications',
      'Antidepressants and minor tranquilizers (for depression)',
    ],

    whenToConsultDoctor:
      "Consult a doctor if there are no improvements with recommended treatments. Seek immediate medical assistance in the case of suicidal thoughts.",
  },

  'pulmonary-arterial-hypertension': {
    title: "Pulmonary Arterial Hypertension",

    description:
      "Pulmonary arterial hypertension is high blood pressure specifically in the lungs. Arteries going from the heart to the lungs become narrow or obstructed, hindering blood flow and increasing pulmonary pressure.",

    causes:
      "Can be idiopathic (no known cause, sometimes genetic) or caused by underlying diseases such as congestive heart failure, lung blood clots, HIV, drug abuse, liver diseases, autoimmune diseases (lupus, scleroderma), congenital heart defects, lung diseases (bronchitis, fibrosis, emphysema), and sleep apnea.",

    riskFactors: [
      'Blood clots in the lungs or Congestive heart failure',
      'Liver disease (cirrhosis)',
      'Illegal drug use (cocaine)',
      'Heavy smoking',
      'HIV and autoimmune diseases',
      'Birth heart defects',
      'Lung diseases (emphysema, fibrosis)',
    ],

    symptoms: [
      'Shortness of breath on exertion',
      'Chest pain and fatigue',
      'Swelling of ankles and legs',
      'Dizziness and fainting spells',
      'Heart palpitations (pounding and racing)',
      'Lips and fingers turning blue',
    ],

    diagnosis: [
      'Detailed medical and family history',
      'Echocardiogram',
      'CT scan and Ventilation-perfusion scan (V/Q scan)',
      'EKG or ECG',
      'Chest X-Ray',
      'Exercise testing (checking oxygen/heart function under exertion)',
      'Right heart catheterization',
      'Blood tests',
    ],

    management: [
      'Blood thinners (if blood clots are the cause)',
      'Oxygen therapy (for emphysema/lung fibrosis)',
      'Calcium channel blockers and anti-hypertensive drugs',
      'Surgery in extreme conditions to correct lung and heart defects',
    ],

    whenToConsultDoctor:
      "Consult a doctor if your condition worsens, symptoms hamper daily life, you experience new side effects from medicines, or feel general discomfort.",
  },

  'pupil-dilation': {
    title: "Pupil Dilation",

    description:
      "Pupil Dilation is the widening of the eyeball's pupil. It may be performed intentionally before a medical procedure, or occur abnormally due to certain drugs, conditions, or injuries.",

    causes:
      "Causes include exposure to antihistamines, anti-nausea/anti-seizure medicines, Atropine, Botox, decongestants, tricyclic antidepressants, and illegal drug usage.",

    riskFactors: [
      'Brain injury or disease',
      'Eye injury',
      'Usage of specific prescription medicines',
      'Usage of certain recreational drugs',
    ],

    symptoms: [
      'Wide or large pupil',
      'Increased sensitivity to light',
      'Blurry vision and headache',
      'Dizziness and feeling a constricted forehead',
      'Eye irritation and sleep disturbances',
      'Drooping eyelid or difficulty moving the eye (in severe cases)',
    ],

    diagnosis: [
      'Physical examination and check of relevant symptoms',
      'Cranial nerve assessment (specifically the third nerve)',
      'Lab tests',
    ],

    management: [
      'Stop usage of potentially harmful drugs causing the dilation',
      'Contact prescriber immediately if caused by prescription medication',
    ],

    whenToConsultDoctor:
      "If symptoms do not improve within a few minutes, or you experience extreme light sensitivity/blurry vision, please see a doctor immediately.",
  },

  'rashes': {
    title: "Rashes",

    description:
      "A rash is an area of inflamed, irritated, and swollen skin that can be itchy, painful, or red. Some rashes lead to blisters, pus, or raw skin. Causes range from mild allergies to severe autoimmune disorders. Common examples include Eczema and Dermatitis.",

    causes:
      "Causes include skin infections, exposure to heat or allergens, immune system disorders (Systemic Lupus Erythematosus), use of certain medicines, and eczema.",

    riskFactors: [
      'Prolonged or frequent exposure to heat or irritants',
      'Exposure to allergens',
      'Insect bites (mosquitoes)',
      'Certain medication reactions',
    ],

    symptoms: [
      'Inflamed, red skin',
      'Pain and itchiness',
      'Dry, crusted, or scaly skin',
      'Small, fluid-filled blisters (from scratching)',
      'Infections due to damaged/broken skin',
    ],

    diagnosis: [
      'Physical examination of the skin',
      'Skin patch test to rule out allergens or infections',
      'Lab tests',
    ],

    management: [
      'Regular use of prescribed medicines',
      'Use of appropriate moisturizers',
      'Prescribed use of steroid-containing medicines',
    ],

    whenToConsultDoctor:
      "If symptoms do not improve within 7-10 days, or you experience severe inflammation or itching, please see a doctor.",
  },

  'redness-in-eye': {
    title: "Redness in Eye",

    description:
      "Redness in the eye is characterized by irritation and inflammation, primarily occurring due to dilated surface blood vessels in the eye.",

    causes:
      "Causes include airborne allergens (smoke, dust), chemical irritants, dry eyes, pink eye (conjunctivitis), contact lenses, digital eye strain, eye trauma, uveitis, glaucoma, and corneal inflammation.",

    riskFactors: [
      'Excessive gadget usage and staring at screens',
      'Old age',
      'Frequent exposure to allergens (smoke)',
      'Eye infections and fatigue',
      'Use of certain medicines',
    ],

    symptoms: [
      'Burning, itching, and irritation',
      'Pain and dryness',
      'Watery eyes and discharge',
      'Light sensitivity',
    ],

    diagnosis: [
      'Physical examination of the eye and assessment of symptoms by a doctor',
    ],

    management: [
      'Avoidance of allergens',
      'Use of prescribed medicines (eye drops)',
      'Lifestyle changes to reduce eye strain',
    ],

    whenToConsultDoctor:
      "If your symptoms do not improve within 7 days, or you experience persistent dry eyes and pain, please see a doctor.",
  },

  'rheumatoid-arthritis': {
    title: "Rheumatoid Arthritis",

    description:
      "Rheumatoid Arthritis (RA) is an autoimmune disease causing chronic inflammation of the joint linings (synovium), leading to severe pain. It can also affect the skin, eyes, heart, lungs, and kidneys. It typically affects both sides of the body symmetrically.",

    causes:
      "Autoimmunity is the main cause. Other contributing factors may include bacterial/viral infections, obesity, and emotional trauma.",

    riskFactors: [
      'Hereditary/Genetic factors (family history of RA)',
      'Environmental factors (smoking, exposure to silica, insecticides, air pollution)',
      'Infections (certain bacteria, viruses, fungi)',
      'Female sex (three times more common in women)',
    ],

    symptoms: [
      'Joint pain, tenderness, and swelling',
      'Joint stiffness that is worst in the morning',
      'Systemic: Anemia, fatigue',
      'Rheumatoid nodules (bumps under skin, usually at elbows)',
      'Pleurisy (chest pain on breathing) and Pericarditis',
      'Cataracts, Scleritis, and Myositis',
    ],

    diagnosis: [
      'Extensive medical history and physical examination',
      'Blood tests (rheumatoid factor, anti-citrullinated protein antibody, CBC, ESR, kidney/liver function)',
      'X-rays to examine joint deformities',
    ],

    management: [
      'Steroids (reduces pain/inflammation)',
      'NSAIDs (Nonsteroidal anti-inflammatory drugs)',
      'DMARDs (Disease modifying anti-rheumatic drugs)',
      'Immunosuppressants',
      'Physical exercise and hot/electric heating bags for relief',
      'Synovectomy (surgery to correct joint damage)',
      'Dietary adjustments (omega-3s, bone broth, fiber, citrus, garlic)',
    ],

    whenToConsultDoctor:
      "Consult a doctor if you suffer from chest pain, eye pain, shortness of breath, or anemia along with joint pain, as RA can affect multiple organ systems.",
  },

  'ringworm-infection': {
    title: "Ringworm Infection",

    description:
      "Ringworm (tinea) is a contagious fungal infection of the superficial skin appearing as a red, itchy circular rash. Types include Tinea corporis (body), Tinea pedis (athlete’s foot), Tinea capitis (scalp), Tinea cruris (jock itch), Facial ringworm, and Tinea unguium (nails).",

    causes:
      "Spreads through contact with infected animals, humans, or contaminated soil. It is caused by fungi types: Trichophyton, Microsporum, and Epidermophyton.",

    riskFactors: [
      'Weak immune system',
      'Warm climate',
      'Contact with an infected person/animal',
      'Sharing clothes or bedding with an infected person',
      'Wearing tight clothes',
    ],

    symptoms: [
      'Ring-like rash with flat, scaly, and raised edges',
      'Blisters',
      'Outside of the ring appears inflamed, inside appears clear and scaly',
      'Overlapping of rings',
    ],

    diagnosis: [
      'Skin examination using a black light',
      'Biopsy, fungal culture, or KOH test for definitive diagnosis',
    ],

    management: [
      'Topical antifungals (for foot, groin, or body)',
      'Oral antifungals (for nails and scalp)',
      'Lifestyle changes: wash bedding/clothes regularly, clean/dry area, wear loose clothing',
      'Home remedies (coconut oil, apple cider vinegar) ONLY if not using medical antifungals',
    ],

    whenToConsultDoctor:
      "Consult your doctor if your symptoms don't improve even after taking OTC antifungal medication for 2 weeks.",
  },

  'sarcomas': {
    title: "Sarcomas",

    description:
      "Sarcoma is a malignant tumor/cancer arising from connective tissues (bone, cartilage, vascular, hematopoietic tissues, fat). It has two major groups: soft-tissue sarcoma and bone sarcoma, with over 70 subtypes (e.g., liposarcoma, osteosarcoma).",

    causes:
      "Exact causes are unclear. DNA mutations cause cells to grow and divide uncontrollably, forming a tumor that can spread. The mutated cell type determines the specific sarcoma type.",

    riskFactors: [
      'Inherited syndromes (passed from parents to children)',
      'Previous radiation therapy for cancer',
      'Exposure to chemicals (industrial chemicals, herbicides)',
      'Exposure to viruses (e.g., human herpesvirus 8 for Kaposi’s sarcoma)',
      'Chronic swelling (lymphedema)',
    ],

    symptoms: [
      'Lump felt through the skin (may or may not be painful)',
      'Abdominal pain and weight loss',
      'Bone pain',
      'Unexpected broken bones with minor or no injury',
    ],

    diagnosis: [
      'Biopsy (sample of cells from the tumor)',
      'Imaging tests (CT scan, ultrasound, MRI)',
      'Bone scan (specifically for osteosarcoma)',
    ],

    management: [
      'Surgery to remove the tumor',
      'Radiation therapy (to shrink tumor before surgery or kill cells)',
      'Chemotherapy medications',
      'Targeted therapies (using man-made antibodies to stop cancer growth)',
    ],

    whenToConsultDoctor:
      "Consult a doctor if you notice a lump larger than 2 inches, a lump that continuously increases in size, or if you start experiencing unexplained pain.",
  },

  'scabies': {
    title: "Scabies",

    description:
      "Scabies is a highly contagious skin infection caused by a parasitic mite (Sarcoptes scabiei) that attaches to and burrows into the outer layer of the skin, causing severe rashes.",

    causes:
      "Caused by an infestation of the Sarcoptes scabiei mite, which crawls on the skin and burrows between fingers, wrists, elbows, waistlines, breasts, genitals, and (in young children) the head, neck, palms, and soles.",

    riskFactors: [
      'Male gender and White race',
      'Close skin-to-skin or sexual contact with an infected person',
      'Low immunity',
      'Living in crowded conditions',
    ],

    symptoms: [
      'Relentless itching that worsens at night',
      'Tiny red burrows (track-like grayish-white raised lines)',
      'Pimple-like rash and blisters',
      'Excessive scratching leading to sores',
      'Crusted scabies (Norwegian scabies): aggressive, thick crusts full of mites/eggs in immune-compromised individuals',
    ],

    diagnosis: [
      'Visual inspection of the rash and itch description',
      'Skin scraping evaluated under a microscope for mites, eggs, or fecal matter',
    ],

    management: [
      'Prescription cream or lotion applied to the entire body from the neck down',
      'Oral pills for severe cases',
      'Antihistamine pills and hydrocortisone cream (only after diagnosis) to control itching',
    ],

    whenToConsultDoctor:
      "A doctor should be consulted if medications are not managing symptoms or if you suspect contact with an infected person.",
  },

  'scaly-skin': {
    title: "Scaly Skin",

    description:
      "Scaly skin presents as cracked, dry, peeling patches giving the skin a grayish color, or as a flaky scalp (dandruff). It results from dead skin flakes that do not shed properly.",

    causes:
      "Caused by the stripping of protective oils due to overuse of harsh chemicals/soaps. It is also a clinical presentation of many skin diseases and a side effect of certain medicines.",

    riskFactors: [
      'Weak immune system (slowing the rebuilding/shedding process)',
      'Aging (wrinkled and dry skin)',
      'Too much sun exposure',
      'Vitamin A deficiency',
      'Family history of psoriasis, eczema, or Ichthyosis',
      'Contact with rash-inducing fabrics',
      'Medicines for acne, cholesterol, and high blood pressure',
    ],

    symptoms: [
      'Itching',
      'Thick, dry patches on the skin',
      'Peeling of dry scales leaving red skin',
      'Dandruff and hair-fall',
    ],

    diagnosis: [
      'Physical examination of the skin',
      'Medical history checking family background and known allergies',
    ],

    management: [
      'Skin ointments and lotions to moisturize',
      'Oral medicines and vitamins prescribed by a dermatologist for deeper lesions',
    ],

    whenToConsultDoctor:
      "When over-the-counter moisturizers are not helpful, a visit to a dermatologist is necessary to identify any serious underlying medical conditions.",
  },

  'schizophrenia': {
    title: "Schizophrenia",

    description:
      "Schizophrenia is a serious mental disorder in which affected patients interpret reality abnormally. It causes delusions, hallucinations, and disordered thinking/behavior, significantly impairing daily functioning.",

    causes:
      "The exact cause is unknown. Researchers believe it is a combination of genetics and an imbalance of vital brain chemicals (neurotransmitters).",

    riskFactors: [
      'Family history of Schizophrenia',
      'Malnutrition',
      'Exposure to toxins and viruses that impact brain development',
      'Usage of psychoactive drugs in teen years or young adulthood',
      'Certain medicines',
    ],

    symptoms: [
      'Self-isolation and social withdrawal',
      'Sleeping difficulties',
      'Mood changes and irritability',
      'Lack of motivation',
      'Hallucinations and delusions',
    ],

    diagnosis: [
      'Physical examination and symptom check',
      'MRI or CT scans to rule out physical brain issues',
      'Psychiatric evaluation to rule out other mental health disorders',
    ],

    management: [
      'Regular use of prescribed antipsychotic medicines',
      'Avoidance of triggers',
      'Individual, family therapy, and support groups',
      'Social skills development and vocational rehabilitation',
      'Electroconvulsive Therapy (ECT) for patients unresponsive to medications',
    ],

    whenToConsultDoctor:
      "Early diagnosis leads to effective treatment. See a doctor if you experience sudden mood changes, hallucinations, or impaired daily routines.",
  },

  'seizure': {
    title: "Seizure",

    description:
      "A seizure is a sudden, uncontrolled electrical disturbance in the brain causing unconsciousness, fits, behavioral changes, and altered movement. Generalized seizures involve the entire brain (Tonic, Clonic, Tonic-clonic/grand mal, Absence/petit mal, Febrile, Infantile, Atonic, Myoclonic). Partial/focal seizures involve part of the brain.",

    causes:
      "Causes include cancer, drug/alcohol withdrawal, strokes, head injuries, brain vessel damage, high fevers, and infections (like COVID-19).",

    riskFactors: [
      'Cancer or tumor of the brain or neck',
      'Bacterial infection of the brain (meningitis)',
      'Narcotic drug (cocaine, heroin) and alcohol withdrawal',
      'Family history of seizures and epilepsy',
    ],

    symptoms: [
      'Tonic-clonic: stopped breathing, sideways head jerk, stiffened limbs moving at awkward angles',
      'Absence: temporary loss of consciousness/blacking out',
      'Atonic: loss of muscle tone causing falls',
      'Post-infection: body shaking lasting a few minutes in children',
      'Infantile: sudden body stiffness (prone to future epilepsy)',
      'Confusion, hallucinations, and unresponsiveness',
      'Unconscious actions: smacking lips, chewing tongue, laughing, crying, gagging',
      'Uncontrolled bladder/bowel movements',
    ],

    diagnosis: [
      'Medical history and physical/neurological examinations',
      'Blood tests and lumbar puncture',
      'MRI, CT Scan, and Electroencephalogram (EEG)',
    ],

    management: [
      'Anti-seizure medications',
      'Lifestyle changes: ketogenic diet, adequate sleep, exercise, avoiding alcohol',
      'Electrical stimulation and surgery',
    ],

    whenToConsultDoctor:
      "Seek immediate medical help if a seizure lasts long, recurs, causes prolonged unconsciousness, or results in injury.",
  },

  'shingles': {
    title: "Shingles",

    description:
      "Shingles (herpes zoster) is a viral infection caused by the Varicella-zoster virus (VZV)—the same virus that causes chickenpox. The virus stays dormant in the nervous system and can reactivate years later, causing a stripe of blistering, shooting pain typically on one side of the torso, face, or neck.",

    causes:
      "Caused by the reactivation of the Varicella-zoster virus in people who have previously had chickenpox. Reactivation is often linked to lowered immunity.",

    riskFactors: [
      'Age 50 or older',
      'Excessive stress',
      'Conditions lowering immune defense (Cancer, HIV)',
      'Serious physical injury',
      'Long-term use of steroids or immunosuppressive medications',
    ],

    symptoms: [
      'Numbness, burning, pain, or tingling',
      'Sensitivity to touch',
      'Red rash developing a few days after pain begins',
      'Itching and fluid-filled blisters that break open and crust over',
      'Fever, headache, fatigue, and light sensitivity (in some people)',
    ],

    diagnosis: [
      'Physical examination of rashes and blisters',
      'Past medical history review',
      'Testing a skin sample or blister fluid (in rare/atypical cases)',
    ],

    management: [
      'Antiviral medicines (started within 3 days of rash) for faster healing',
      'Anticonvulsants (to suppress nerve pain) and Antidepressants',
      'Prescription painkillers and numbing medicines',
      'Cool compresses, colloidal oatmeal baths, and medicated lotions',
    ],

    whenToConsultDoctor:
      "Consult immediately if pain/rash is near the eye (can cause lasting damage), you are over 60, have a weakened immune system, or if the rash is widespread and extremely painful.",
  },

  'short-bowel-syndrome': {
    title: "Short Bowel Syndrome",

    description:
      "Short Bowel Syndrome is an intestinal abnormality where the body cannot efficiently absorb nutrients due to the short functional length of the small intestine. This is usually due to surgical removal or congenital defects.",

    causes:
      "Occurs due to surgical removal of part of the intestine (from Crohn’s disease, injuries, cancer, blood clots) or if a portion is missing/defective from birth.",

    riskFactors: [
      'Recurrent intestinal surgeries',
      'Crohn’s disease (inflammatory bowel disease)',
      'Gastrointestinal cancers',
      'Intestinal infections and injuries',
      'Family history',
    ],

    symptoms: [
      'Fatigue and malnutrition',
      'Diarrhea',
      'Greasy, foul-smelling stools',
      'Swelling in the limbs',
      'Defective general body functioning (e.g., vision problems) due to reduced absorption',
    ],

    diagnosis: [
      'Physical examination and symptom check',
      'X-rays, CT scans, and MRIs',
      'Stool and blood tests',
    ],

    management: [
      'Nutritional therapy and dietary supplements',
      'Regular use of prescribed medicines',
      'Surgery (in severe cases)',
      'Lifestyle changes (stopping smoking, avoiding foods that exacerbate symptoms)',
    ],

    whenToConsultDoctor:
      "Early diagnosis leads to effective treatment. If you experience severe gastrointestinal pain, persistent diarrhea, or signs of malnutrition, please see a doctor.",
  },

  'sialorrhea': {
    title: "Sialorrhea",

    description:
      "Sialorrhea (hypersalivation) is the abnormally increased production of saliva, leading to drooling (Anterior Sialorrhea) or spillage into airways (Posterior Sialorrhea). It is non-pathological in babies under 4.",

    causes:
      "Causes include trauma/injury to salivary glands, pregnancy nausea, excessive starchy foods, mouth injuries/ulcers, swollen tongue, mouth breathing (blocked nose/asthma), jaw dislocation, strong mint/cinnamon gums, and smoking.",

    riskFactors: [
      'Gastric disturbances (nausea, GERD/acidity)',
      'Anxiety disorders',
      'Neurological conditions (Stroke, Down syndrome, cerebral palsy, Parkinson’s, facial nerve palsy)',
      'Viral/bacterial infections (rabies, mumps, mouth sores, thrush, Tetanus/jaw lock)',
      'Pellagra (Vitamin B3 deficiency)',
      'Radiation treatment for head/neck cancer',
      'Difficulty swallowing (tonsillitis, throat cancer)',
      'Side effects of antipsychotic drugs or pilocarpine',
      'Toxin exposure (mercury, copper, arsenic)',
    ],

    symptoms: [
      'Frequent spitting and swallowing',
      'Drooling or leaking of saliva',
      'Dry, chapped, sore lips (angular cheilitis)',
      'Difficulty speaking and altered taste',
      'Gagging/coughing or lung infections (if saliva enters airways)',
    ],

    diagnosis: [
      'Medical history (pregnancy, accidents, medicines)',
      'Examination of mouth, nose, tonsils, jaw, and glands',
      'Measuring saliva levels',
      'Neck X-rays and specific gland X-rays (sialography)',
    ],

    management: [
      'Therapy for mouth closure, posture, swallowing, and speech',
      'Medicines (atropine, muscle relaxants, antiemetics)',
      'Surgery for injuries or cancers affecting glands',
      'Home remedies (drinking water, tooth-brushing, mouthwashes)',
    ],

    whenToConsultDoctor:
      "Seek expert advice for infections, breathing problems, neurological conditions, liver/stomach diseases, or cancers. If home remedies don't help, visit a doctor.",
  },

  'skin-burns': {
    title: "Skin Burns",

    description:
      "Skin burns occur when the skin contacts a burning surface or substance. They range from superficial (First-degree: pink, mild pain) to partial thickness (Second-degree: blisters, moist, severe pain) to full thickness (Third-degree: white/brown leathery skin, painless due to nerve damage).",

    causes:
      "Caused by thermal heat (hot liquids, flames), radiation (high energy rays), chemicals (reactive agents), and electricity (high voltage currents).",

    riskFactors: [
      'Young children (thinner skin, lack of danger awareness)',
      'Elderly individuals (thinner skin, less mobility)',
      'Diabetic patients (neuropathy reduces ability to feel heat)',
    ],

    symptoms: [
      'First-degree: Mild pain, pink/red skin (like sunburn)',
      'Second-degree: Excruciating pain, blisters, pink and moist skin',
      'Third-degree: White to brown leathery skin, edema, painless (nerve damage), no blisters',
    ],

    diagnosis: [
      'Clinical evaluation using the Wallace "Rule of Nines" to assess the total body surface area and depth affected.',
    ],

    management: [
      'First-degree (Superficial): Cool water soak, aloe vera, antibiotic ointment, hydration (heals in 4-5 days)',
      'Second-degree (Partial thickness): Cool water soak, sterile dressing, painkillers (heals in 14-36 days)',
      'Third-degree (Full thickness): Immediate emergency medical help, elevate burn above heart, skin grafts, Escharotomy (surgical incision to relieve pressure)',
      'Chemical: Remove clothing and rinse immediately',
    ],

    whenToConsultDoctor:
      "Seek immediate medical assistance if the burn is more than 3 inches in diameter or involves deep layers. Consult a doctor if wounds aren't responding to basic treatment.",
  },

  'smooth-muscle-spasms': {
    title: "Smooth Muscle Spasms",

    description:
      "Smooth muscles are found on the inner walls of hollow organs like the stomach, esophagus, and blood vessels. A prolonged, painful involuntary contraction of these muscles is known as a smooth muscle spasm.",

    causes:
      "Causes include dehydration, labor/childbirth, Raynaud’s phenomenon (decreased blood flow to extremities), kidney stones, and gallstones.",

    riskFactors: [
      'Elderly age',
      'Diabetes',
      'Anemia',
      'Heart attack',
    ],

    symptoms: [
      'Painful internal spasms',
      'Sleep disturbances',
      'Loss of appetite',
      'Paresthesia (abnormal sensations)',
      'Flu-like symptoms',
    ],

    diagnosis: [
      'Medical history and physical examination',
      'EMG, CT Scan, MRI, Thyroid Function Test (TFT), and Complete Blood Count (CBC) if the cause is unknown',
    ],

    management: [
      'Dicyclomine',
      'Hyoscyamine',
      'Mebeverine',
      'Peppermint oil',
    ],

    whenToConsultDoctor:
      "Spasms usually resolve within minutes/hours. Consult a doctor immediately if you experience frequent persistent spasms, sudden chest pain, or shortness of breath.",
  },

  'soft-tissue-cancers': {
    title: "Soft Tissue Cancers",

    description:
      "Soft tissue sarcomas are cancers that start in connective and supporting tissues (muscle, blood vessels, fat, fibrous tissue). They can form anywhere but mostly appear in the arms, legs, abdomen, and chest. Subtypes include liposarcoma, leiomyosarcoma, and rhabdomyosarcoma.",

    causes:
      "Caused by DNA mutations that lead cells to grow and divide uncontrollably, forming a tumor. The mutated cell type determines the specific type of soft tissue sarcoma.",

    riskFactors: [
      'Inherited syndromes',
      'Previous radiation therapy',
      'Exposure to chemicals (herbicides, arsenic, dioxin)',
    ],

    symptoms: [
      'Often asymptomatic initially',
      'Noticeable lump or swelling',
      'Pain (if the tumor presses on nearby nerves or muscles)',
    ],

    diagnosis: [
      'Physical examination',
      'Imaging tests (X-ray, ultrasound, MRI scan)',
      'Biopsy (sample taken to examine under a microscope)',
    ],

    management: [
      'Surgery to remove the tumor (most common treatment)',
      'Radiation therapy or Brachytherapy (radioactive pellets)',
      'Chemotherapy',
    ],

    whenToConsultDoctor:
      "Consider making an appointment if you have a painful/growing lump, a lump located deep inside a muscle, or a recurrence of a previously removed lump.",
  },

  'spasms': {
    title: "Spasms",

    description:
      "A spasm is a sudden, uncontrolled, repetitive contraction of a muscle, muscle group, or organ. It causes an intense burst of pain that hampers movement in and around the affected area.",

    causes:
      "Causes include alcohol abuse, alkalosis, hyperventilation, hyperparathyroidism, malnutrition, certain medicines, pregnancy, Vitamin D deficiency, Bell’s palsy, Multiple sclerosis, Muscular dystrophy, Parkinson’s, and dehydration.",

    riskFactors: [
      'Tight, inflexible muscles and poor muscle tone',
      'Poor physical condition or inadequate diet',
      'Physical overexertion and muscle fatigue',
      'Muscle injury and dehydration',
    ],

    symptoms: [
      'Abdominal or muscle pain',
      'Difficulty walking and weakness',
      'Persistent diarrhea and nausea/vomiting',
      'Fatigue and headache',
      'Grimacing, numbness, and tingling in hands/feet',
      'Rapid breathing',
    ],

    diagnosis: [
      'Detailed medical history and inspection of the affected muscle',
      'Symptom tracking (duration, intensity, severity, triggers)',
    ],

    management: [
      'Treating the underlying cause',
      'Applying ice packs to tender muscles and heat packs to tight muscles',
      'Gentle stretching and massage',
      'Patient counseling to avoid physical overexertion',
    ],

    whenToConsultDoctor:
      "Consult a doctor if the condition worsens, impairs daily life, occurs frequently, causes unbearable pain, or results in severe emotional and physical distress.",
  },

  'stage-4-prostate-cancer': {
    title: "Stage 4 Prostate Cancer",

    description:
      "Prostate cancer affects the prostate gland below the bladder. Stage 4 (advanced stage) means the tumor has spread outside the prostate to other organs (lungs, bones, lymph nodes, liver). It is largely incurable, and treatment focuses on extending life and alleviating symptoms.",

    causes:
      "The definitive cause is unknown. It begins as abnormal DNA changes causing uncontrolled growth. Stage 4 occurs when these cells metastasize to other organs and lymph nodes.",

    riskFactors: [
      'Age (above 50)',
      'Race (common in African-Americans)',
      'Obesity',
      'Family history of prostate cancer',
    ],

    symptoms: [
      'Painful urination',
      'Weight loss',
      'Blood in semen',
      'Tiredness and fatigue',
      'Swelling in the legs',
    ],

    diagnosis: [
      'Physical examinations and Digital Rectal Exam',
      'PSA blood tests',
      'MRI, CT Scan, and Bone scan',
      'Biopsy for definitive diagnosis',
    ],

    management: [
      'Hormone therapy',
      'Radiotherapy',
      'Chemotherapy',
      'Pain killers and palliative care',
    ],

    whenToConsultDoctor:
      "Consult your doctor if symptoms worsen or if you experience any allergic reactions to medications or procedures.",
  },

  'stomach-disorders': {
    title: "Stomach Disorders",

    description:
      "Stomach disorders (digestive disorders) involve conditions affecting digestion, causing abdominal pain or discomfort. They can involve the stomach, digestive tract, circulatory system, or reproductive/urinary tracts. Common types include GERD, gastritis, hiatal hernias, and peptic ulcers.",

    causes:
      "Causes include infections (bacterial/viral/parasitic), Celiac disease, diverticulitis, food intolerance (lactose), gallbladder stones, IBS, liver/pancreas inflammation, endometriosis, kidney stones, PID, ectopic pregnancies, appendicitis, bowel obstruction, hernias, and heavy metal poisoning.",

    riskFactors: [
      'Being overweight or obese',
      'Unhealthy diets (high in salt/smoked foods)',
      'Smoking',
      'Family history of stomach disorders',
    ],

    symptoms: [
      'Digestive: Abdominal pain/cramping, swelling/bloating, belching, bloody stools, constipation, diarrhea, gas, nausea/vomiting',
      'Systemic: Fever, enlarged liver/spleen/glands, painful sex, painful urination, unexplained weight loss, numbness',
      'Life-threatening: Bleeding while pregnant, chest pain/pressure, rapid heart rate, breathing problems',
    ],

    diagnosis: [
      'Medical history and physical examination',
      'Lab tests: Fecal occult blood tests, stool cultures',
      'Imaging tests: CT scans, Barium enemas, MRI, MRCP, Ultrasounds',
      'Endoscopic procedures: Colonoscopy, ERCP, Sigmoidoscopy',
    ],

    management: [
      'Over-the-counter remedies and condition-specific prescriptions',
      'Dietary changes (avoid triggers, hard-to-digest foods, alcohol; drink lots of water; use ginger/mint)',
      'Avoid lying down when the stomach is upset',
      'Warm baths or heating pads',
      'Surgery for severe specific conditions',
    ],

    whenToConsultDoctor:
      "Consult a doctor if you experience blood in bowel movements, unintentional weight loss, ongoing severe vomiting/diarrhea, unrelieved heartburn, or severe abdominal pain.",
  },

  'stomach-ulcers': {
    title: "Stomach Ulcers",

    description:
      "Stomach ulcers (gastric or duodenal ulcers) are open sores in the lining of the digestive tract caused by the digestive action of pepsin and stomach acid.",

    causes:
      "The most common cause is a bacterial infection by Helicobacter pylori. Other causes include prolonged use of NSAIDs, hypercalcemia, Zollinger-Ellison syndrome, low melatonin levels, family history, and alcohol consumption.",

    riskFactors: [
      'Excessive smoking, acidic drinks, and NSAID use',
      'Older women (more prone to small intestine ulcers)',
      'Exposure to H. pylori',
      'Family history of ulcers',
      'Excess stress and spicy foods (can worsen, but don’t directly cause ulcers)',
    ],

    symptoms: [
      'Severe pain right below the ribs (often worse at night or 1-2 hours post-meals)',
      'Loss of appetite and significant weight loss',
      'Feeling of fullness (unable to drink much fluid)',
      'Nausea and vomiting',
      'Bloody or black stools',
      'Restlessness and general discomfort',
    ],

    diagnosis: [
      'Medical history and physical exam',
      'Laboratory tests for H. pylori',
      'Endoscopy',
      'Barium swallow (X-rays after swallowing a contrast liquid)',
    ],

    management: [
      'Lifestyle modifications: healthy diet, avoid milk/smoking/alcohol, control stress',
      'Antibiotics (e.g., Amoxicillin) to kill H. pylori',
      'Proton pump inhibitors (Omeprazole) and H-2 blockers (Ranitidine)',
      'Antacids and mucosal protectants (Sucralfate)',
    ],

    whenToConsultDoctor:
      "If your ulcer doesn’t heal with the recommended treatment, a doctor should be consulted.",
  },

  'stomatitis': {
    title: "Stomatitis",

    description:
      "Stomatitis refers to inflammatory processes in the oral cavity, specifically the mucous membranes of the lips and mouth. It often forms ulcers and impairs speaking, eating, and sleeping. The two main types are Canker sores (aphthous ulcers) and Cold sores (fever blisters).",

    causes:
      "Canker sores: Hormonal changes, stress, poor nutrition, Vitamin B12 deficiency, viruses, or foods like chocolate/coffee. Cold sores: Herpes virus type 1 (activated by stress/fever/sun). Other causes: Dentures, tobacco, braces, sharp teeth, food burns, chemotherapy, and certain drugs.",

    riskFactors: [
      'Poor nutrition and sudden weight loss',
      'Stress and lack of sleep',
      'Weakened immune system',
      'Vitamin B12 or folic acid deficiencies',
    ],

    symptoms: [
      'Canker sores: Pale yellow painful ulcers with a red outline inside the mouth. No fever. Burning sensation on spicy food. Lasts 5-10 days.',
      'Cold sores: Fluid-filled painful sores outside the mouth (lips). Tingling/burning before appearance. Flu-like symptoms. Forms scabs and lasts ~10 days.',
    ],

    diagnosis: [
      'Visual inspection (canker sores inside/non-fluid, cold sores outside/fluid-filled)',
      'Detailed medical history assessing immunosuppression or nutritional deficits',
      'Culture, biopsy, or immunofluorescence in severe cases',
    ],

    management: [
      'Canker sores: Analgesic gels, medicated mouthwashes, topical corticosteroids, ice-pops, avoiding spicy foods, fixing sharp teeth/dentures',
      'Cold sores: Pain relievers (Tylenol, ibuprofen), topical treatments like Blistex and Campho-phenique',
    ],

    whenToConsultDoctor:
      "Consult a dentist immediately for dental-associated sores. Consult a physician for frequent canker sores (to test for B12/iron deficiency) or if fever blisters don't respond to treatment.",
  },

  'swelling': {
    title: "Swelling",

    description:
      "Swelling describes the enlargement of organs, tissues, or skin due to fluid buildup or inflammation. It can be internal or external, localized or generalized, and can cause rapid, temporary weight gain.",

    causes:
      "Causes include injuries to bone/skin, insect bites/allergies, bacterial/viral infections, prolonged standing, pregnancy, hormonal changes, menstruation, hives, and rashes.",

    riskFactors: [
      'Medicines: ACE inhibitors, diabetes drugs, steroids, contraceptives',
      'Cancer chemotherapy drugs',
      'Deep vein thrombosis (DVT) causing leg swelling',
      'Arthritis, osteoporosis, heart failure, and kidney failure',
      'Venomous bites (medical emergency)',
      'Irritable bowel disease (causing bloating/abdominal swelling)',
    ],

    symptoms: [
      'Pain, itching, and redness (for injuries/bites)',
      'Fever, flu-like symptoms, vomiting, and wheezing (if inflammatory/allergic)',
      'Swelling of lower legs, ankles, face, and fingers (in heart/kidney conditions)',
    ],

    diagnosis: [
      'Medical history (medicines, injuries, bites)',
      'Physical examination (checking for abscesses, fever, redness)',
      'Ultrasounds, CT scans, and MRIs for internal swelling (tumors, clots)',
      'Blood and urine tests for infections',
    ],

    management: [
      'Antihistamines for allergies/bites',
      'Steroids and topical creams (Chymotrypsin) for inflammation',
      'Antibiotics and antivirals for infections',
      'Surgery to remove abscesses or tumors',
    ],

    whenToConsultDoctor:
      "Consult a doctor if the swelling continuously increases, impairs normal organ/limb function, causes general discomfort, or if symptoms worsen.",
  },

  'systemic-fungal-infections': {
    title: "Systemic Fungal Infections",

    description:
      "Systemic fungal infections (systemic mycoses) occur when fungi enter the bloodstream and infect internal organs, especially the respiratory system. They can lead to severe organ failure and death. They are caused by either primary pathogens or opportunistic pathogens.",

    causes:
      "Primary pathogens (infect healthy people): Histoplasma, Coccidioides, Blastomyces. Opportunistic pathogens (infect immunocompromised people): Candida, Aspergillus, Cryptococcus, Zygomycetes.",

    riskFactors: [
      'HIV infection',
      'Low levels of neutrophils',
      'Immunosuppressive therapy',
      'Cancer and Major surgery',
      'Increased age or being a young child',
    ],

    symptoms: [
      'General: High fever, cough, decreased appetite',
      'Lungs: Shortness of breath, dry cough, coughing up blood',
      'Brain: Headaches, seizures, loss of movement control',
      'Bones: Fever, bone pain',
      'Eyes: Pain, redness, blurred/disturbed vision',
    ],

    diagnosis: [
      'Detailed travel and medical history',
      'Microscopic examination of Sputum culture and stains',
      'Histopathology of sputum or needle biopsies',
      'Serologic tests measuring organism-specific antigen and serum beta-glucan',
    ],

    management: [
      'Reversing immunosuppression (treating underlying conditions, adjusting therapies)',
      'Antifungal Medicines: Amphotericin B, Fluconazole, Itraconazole, Voriconazole, Caspofungin',
    ],

    whenToConsultDoctor:
      "Systemic fungal infections are medical emergencies with high mortality rates if delayed. See a doctor immediately if you experience relevant symptoms.",
  },

  'testicular-cancer': {
    title: "Testicular Cancer",

    description:
      "Testicular cancer develops in the testicles (which make male hormones and sperm). It is rare compared to other cancers, mostly affecting men aged 15-44. It is highly treatable even if it has spread. It typically originates in the germ cells.",

    causes:
      "Causes are unclear, but it develops when healthy cells in the testicles mutate, divide uncontrollably, and form a mass.",

    riskFactors: [
      'Family history of testicular cancer (father or brother)',
      'History of undescended testes (cryptorchidism)',
      'Germ cell neoplasia in situ (GCNIS)',
      'Klinefelter syndrome',
    ],

    symptoms: [
      'Enlargement or lump in the testicles',
      'A dull ache in the groin/abdomen',
      'Heaviness or sudden collection of fluid in the scrotum',
      'Tenderness or enlargement of breasts',
      'Pain or discomfort in the scrotum, testicle, or back',
    ],

    diagnosis: [
      'Testicular self-exam',
      'Physical exam by a urologist',
      'Testicular ultrasound',
      'Blood tests for serum tumor markers',
    ],

    management: [
      'Surgery (total orchiectomy or testis-sparing surgery in children)',
      'Radiation and Chemotherapy',
      'Sperm banking before treatment',
      'Testicular prosthetics for cosmetic restoration',
    ],

    whenToConsultDoctor:
      "If you experience a suspicious lump, swelling, or pain in the testicles/groin that persists for longer than 2 weeks, consult a doctor immediately.",
  },

  'thalassemia': {
    title: "Thalassemia",

    description:
      "Thalassemia is an inherited blood disorder affecting hemoglobin production. It has two types: Alpha Thalassemia (gene mutations affecting alpha globin) and Beta Thalassemia (mutations affecting beta globin). Severity ranges from silent carriers to major/fatal forms.",

    causes:
      "Thalassemia is purely a genetic disorder inherited from one or both parents. Inheriting one mutated gene makes a person a carrier, while mutations in multiple genes cause moderate to severe disease.",

    riskFactors: [
      'Family history and genetics',
    ],

    symptoms: [
      'Fatigue and weakness',
      'Jaundice (pale/yellowish skin)',
      'Difficulty breathing',
      'Delayed growth',
      'Bone deformities in the face and skull',
      'Enlarged spleen or liver',
      'Dark colored urine',
    ],

    diagnosis: [
      'Complete Blood Count (CBC)',
      'Hemoglobin Electrophoresis (identifies abnormal hemoglobin)',
      'Genetic Testing',
      'Prenatal Testing (CVS or amniocentesis)',
    ],

    management: [
      'Mild: No treatment needed, monitor for complications',
      'Moderate/Severe: Regular blood transfusions',
      'Iron Chelation Therapy (deferoxamine, deferiprone) to prevent iron overload',
      'Folic Acid Supplements',
      'Splenectomy (for severe spleen enlargement)',
      'Bone Marrow or Stem Cell Transplant (the only cure for severe cases)',
    ],

    whenToConsultDoctor:
      "If there is a family history, seek genetic counseling before pregnancy. Consult a doctor for diagnostic tests if symptoms of severe anemia or delayed growth appear.",
  },

  'tinnitus': {
    title: "Tinnitus",

    description:
      "Tinnitus is the sensation of hearing sounds (ringing, buzzing, hissing, chirping) when no external sound is present. It can be continuous or intermittent, and its perceived loudness varies with background noise.",

    causes:
      "Causes include prolonged exposure to loud sounds, earwax blockage/infections, side effects of medicines/aging, Meniere’s disease, systemic disorders (hypertension, anemia, diabetes, hypothyroidism), TMJ disorders, and head/neck injuries.",

    riskFactors: [
      'Prolonged exposure to loud noise',
      'Increasing age and Male gender',
      'Smoking',
      'Cardiovascular disorders',
    ],

    symptoms: [
      'Hearing phantom sounds (ringing, buzzing, humming, roaring, clicking)',
      'Varying intensity and loudness in one or both ears',
      'Interference with concentration and psychological distress',
    ],

    diagnosis: [
      'Complete medical history and ear/neck checkup',
      'Nerve and hearing tests by an ENT specialist',
      'MRI and CT scans to check internal ear organs',
    ],

    management: [
      'Changing prescriptions if caused by medication side effects',
      'Ear masking devices or hearing aids',
      'Professional earwax removal by an ENT',
      'Antibiotics/corticosteroids for infections/pain',
      'Anti-anxiety and antidepressants for stress relief',
      'Surgery for tumors/defects',
    ],

    whenToConsultDoctor:
      "Consult your doctor if tinnitus is accompanied by ear pain, discharge, dizziness, or hearing loss, or if it persists for over a week after a respiratory infection.",
  },

  'topical-lesions': {
    title: "Topical Lesions",

    description:
      "Topical Lesions are abnormal, inflamed, or damaged areas of the skin, appearing as bumps, patches, ulcers, or sores. Common types include Acne, Eczema, Cold sores, Blisters, Hives, Moles, Impetigo, and Psoriasis.",

    causes:
      "Causes vary by type: harmless clogs (Acne), chronic inflammation (Eczema, Psoriasis), viral infections (Herpes Simplex for cold sores), allergic reactions (Hives), trauma/friction (Blisters), and bacterial infections (Impetigo).",

    riskFactors: [
      'Sensitive skin',
      'Family or genetic history',
      'Weak immune system',
      'Usage of certain medicines',
    ],

    symptoms: [
      'Red, patchy areas',
      'Inflamed skin and Pain',
      'Abnormal skin color',
    ],

    diagnosis: [
      'Physical skin examination by a dermatologist or doctor',
      'Skin biopsy, swab, or scraping',
    ],

    management: [
      'Regular use of prescribed medicines',
      'Avoidance of exposure to triggering agents',
      'Lifestyle changes',
      'Surgery in severe cases (e.g., atypical mole removal)',
    ],

    whenToConsultDoctor:
      "See a doctor if symptoms do not improve within a few days, you notice new/changing moles, or experience severe inflammation.",
  },

  'trigeminal-neuralgia': {
    title: "Trigeminal Neuralgia",

    description:
      "Trigeminal neuralgia is a chronic pain condition involving the trigeminal nerve, which carries sensations from the face to the brain. Mild stimulation of the face results in spontaneous, severe, electric-shock-like pain.",

    causes:
      "Caused by irritation of the nerve from swollen underlying blood vessels or tumors, Multiple Sclerosis (degeneration of protective nerve coverings), aging, brain lesions, facial trauma, surgical injuries, or stroke.",

    riskFactors: [
      'Washing the face, brushing teeth, smiling, talking',
      'Slight touches to the face',
      'Cold or hot drinks',
      'Dental surgery or facial injury',
    ],

    symptoms: [
      'Severe, excruciating pain resembling electric shocks',
      'Spontaneous pain attacks localized to one side of the face (cheeks, jaws, teeth, lips)',
      'Pain lasting seconds to minutes, or prolonged episodes lasting weeks/months',
      'Consistent burning sensation',
      'Frequency and intensity of attacks increase with time',
    ],

    diagnosis: [
      'Detailed medical, dental, and family history',
      'Neurological examination',
      'CT scans and MRIs',
    ],

    management: [
      'Anti-seizure medications (Carbamazepine)',
      'Muscle-relaxing agents',
      'Botox or Glycerol injections',
      'Surgery to relieve nerve pressure in severe cases',
    ],

    whenToConsultDoctor:
      "Consult a doctor if the frequency/severity of attacks increases, pain becomes chronic, causes severe discomfort, or condition worsens.",
  },

  'ulcerative-colitis': {
    title: "Ulcerative Colitis",

    description:
      "Ulcerative Colitis is a type of inflammatory bowel disease causing mild to severe inflammation and ulcer formation in the digestive tract, primarily affecting the large intestine (colon) and rectum. Symptoms appear gradually.",

    causes:
      "The exact cause is unknown. Possible explanations include an immune system malfunction (attacking normal bowel cells) and genetics/family history. Stress and diet are aggravating factors, though not direct causes.",

    riskFactors: [
      'Weak immune system',
      'Family history of inflammatory bowel disease',
      'Certain infections',
    ],

    symptoms: [
      'Diarrhea, often accompanied by blood or pus',
      'Abdominal and rectal pain/discomfort',
      'Urgency and difficulty during defecation',
      'Weight loss, fatigue, and fever',
      'Stunted growth in children',
    ],

    diagnosis: [
      'Physical examination and symptom check',
      'Blood tests and Stool tests',
      'Colonoscopy and Flexible Sigmoidoscopy',
    ],

    management: [
      'Regular use of prescribed anti-inflammatory medicine',
      'Immunosuppressant drugs and Biologic agents',
      'Antidiarrheal and antispasmodic medications',
      'Iron supplements (to treat anemia from bleeding)',
    ],

    whenToConsultDoctor:
      "If your symptoms do not improve within a few days or you experience severe abdominal pain, persistent bloody diarrhea, or unexplained fever, see a doctor.",
  },

  'urinary-incontinence': {
    title: "Urinary Incontinence",

    description:
      "Urinary Incontinence is involuntary urination characterized by leakage of urine without conscious control. Types include Stress Incontinence (from exertion), Urge Incontinence (from infection/injury), Overflow Incontinence (from blockage), and Total Incontinence.",

    causes:
      "Stress: Pregnancy, childbirth, hysterectomy, obesity, old age. Urge: Cystitis, prostate enlargement, Multiple Sclerosis. Overflow: Tumors, constipation, bladder surgery. Total: Birth defects, spinal injuries, fistulas. Other: Medications, alcohol.",

    riskFactors: [
      'Urinary Tract Infections',
      'Pregnancy and Old age',
      'Obesity',
      'Tumors or surgeries involving the urinary bladder',
    ],

    symptoms: [
      'Urine leakage during coughing, laughing, or sneezing',
      'Urgent, strong need to urinate',
      'Leakage without prior warning or urge',
      'Wetting the bed during sleep',
    ],

    diagnosis: [
      'Physical examination and medical history (assessing frequency of leakage, fluid intake)',
    ],

    management: [
      'Medicines',
      'Urinary bladder training and Behavioral treatment',
      'Pelvic floor exercises',
      'Avoidance of caffeine and alcohol',
      'Usage of absorbent pads or adult diapers',
    ],

    whenToConsultDoctor:
      "Consult a doctor if it affects daily life activities, you experience frequent/urgent needs, bedwetting, or rely heavily on absorbent pads.",
  },

  'vomiting': {
    title: "Vomiting",

    description:
      "Vomiting is the forceful, voluntary or involuntary expulsion of stomach contents through the mouth. It is not a disease itself, but a symptom of underlying disorders ranging from food poisoning to severe central nervous system issues.",

    causes:
      "Causes include infections (flu, food poisoning, UTI), CNS diseases (migraines, raised intracranial pressure), metabolic issues (diabetic ketoacidosis, high calcium), drugs (chemo, opiates, antibiotics), alcohol excess, pregnancy, motion sickness, and severe pain (kidney stones, appendicitis).",

    riskFactors: [
      'Female gender and Obesity',
      'Family history and emotional distress',
      'Mental health problems and pre-existing gastrointestinal disorders',
    ],

    symptoms: [
      'Nausea and stomach cramps',
      'Heartburn and diarrhea',
      'Fever, lightheadedness, vertigo, and fainting',
      'Dry mouth, excessive sweating, rapid pulse, and decreased urination',
      'Confusion',
    ],

    diagnosis: [
      'Complete blood count and blood electrolyte levels',
      'Liver function tests and complete urine examination',
      'Imaging tests: Abdominal X-ray and CT scan (for persistent cases)',
    ],

    management: [
      'Sipping clear fluids and oral rehydration solutions to prevent dehydration',
      'Avoiding solid foods until vomiting subsides',
      'Eating crackers/protein snacks for pregnancy-related morning sickness',
      'Antibiotics for underlying bacterial infections',
    ],

    whenToConsultDoctor:
      "Seek emergency help for blood in vomit, vomiting after head injuries, severe headache/stiff neck, severe abdominal pain, inability to keep fluids down for >12 hours, or continuous vomiting for >24 hours.",
  },

  'tuberculosis': {
    title: "Tuberculosis",

    description:
      "Tuberculosis (TB) is a contagious bacterial infection that attacks the lungs and can spread to the brain and spine. Latent TB shows no symptoms (bacteria are contained), while Active TB destroys tissue and is fatal if untreated. Treatment takes 6 to 9 months with antibiotics.",

    causes:
      "Caused by Mycobacterium tuberculosis. It spreads through the air when breathing the air of an infected person over a significant period of time.",

    riskFactors: [
      'HIV infection (highest risk factor)',
      'Diabetes mellitus, severe kidney disease, and cancer',
      'Use of immunosuppressive drugs (corticosteroids) or organ transplants',
      'Tobacco smoking and indoor air pollution',
      'Malnutrition and recreational drug use',
      'Being a baby/child (undeveloped immune systems)',
    ],

    symptoms: [
      'Cough lasting more than 3 weeks',
      'Fever, chills, and night sweats',
      'Coughing up blood',
      'Breathlessness, weakness, fatigue',
      'Unexplained weight loss and loss of appetite',
    ],

    diagnosis: [
      'Active TB: Chest X-ray, sputum cultures for acid-fast bacilli, tissue biopsy',
      'Latent TB: Mantoux tuberculin skin test, Interferon-gamma release assays (IGRA)',
    ],

    management: [
      'Combination of multiple antibiotics to prevent bacterial resistance',
      'Treatment duration of 6 to 9 months for both active and latent TB',
      'Directly Observed Treatment (DOT) to ensure proper medication adherence',
      'Extended 18-24 month therapy with 4+ antibiotics for Multiple-drug-resistant TB (MDR-TB)',
    ],

    whenToConsultDoctor:
      "Consult a doctor if you experience side effects from medications like jaundice, persistent high fever, abdominal/lower chest pain, tingling in extremities, heartburn, nosebleeds, dark urine, or bleeding gums.",
  },

  'vaginal-thrush': {
    title: "Vaginal Thrush",

    description:
      "Vaginal thrush (candidiasis) is a common yeast infection affecting about 75% of women. The yeast is naturally present in the bowel and vagina; symptoms arise only when they multiply excessively, causing uncomfortable itching and discharge.",

    causes:
      "Caused by an overgrowth of Candida albicans (or C. glabrata/tropicalis). Triggers disrupting normal bacterial balance include hormonal changes, immune system problems, and antibiotic usage.",

    riskFactors: [
      'Age (most common in 20s and 30s)',
      'Pregnancy',
      'Use of antibiotics',
      'Poorly controlled diabetes',
      'Weakened immune system (HIV, chemotherapy)',
      'Vaginal dryness/friction during sex',
    ],

    symptoms: [
      'Itching and soreness around the entrance of the vagina (labia)',
      'Thick, white, or thin/watery odorless vaginal discharge',
      'Painful sex and stinging sensation while urinating',
      'Red, swollen, or cracked skin around the vagina',
    ],

    diagnosis: [
      'Detailed history of symptoms',
      'Physical examination of the genitals',
      'Swab from the affected area for laboratory confirmation',
    ],

    management: [
      'Antifungal creams or vaginal pessaries (tablets) for ~6 days',
      'Oral tablets (though not recommended for pregnant women)',
      'Identifying and managing underlying contributing factors',
    ],

    whenToConsultDoctor:
      "Consult a doctor if you are under 16 or over 60, pregnant, experience abnormal bleeding/abdominal pain, had two episodes in 6 months, had a bad reaction to anti-thrush medications, or have a weak immune system.",
  },

  'von-willebrand-disease': {
    title: "Von Willebrand Disease",

    description:
      "Von Willebrand Disease (vWD) is an inherited hematological disorder where the blood cannot clot efficiently due to a deficiency or dysfunction of the Von Willebrand (vWF) blood protein. Type 1 is mildest/most common; Type 2 involves dysfunctional vWF; Type 3 is the rarest and most severe.",

    causes:
      "It is a genetic disorder typically inherited from parents. It causes a deficiency or dysfunction of the vWF clotting factor. Rarely, it occurs via spontaneous gene mutation.",

    riskFactors: [
      'Family history',
      'Certain drugs and Autoimmune disorders',
    ],

    symptoms: [
      'Profuse bleeding from minor cuts or procedures (e.g., dental work)',
      'Heavy and prolonged menstrual bleeding',
      'Easy bruising and frequent nosebleeds',
      'Blood in urine and stools',
      'Anemia, tiredness, and fatigue',
    ],

    diagnosis: [
      'Von Willebrand factor antigen test (measures vWF protein amount)',
      'Ristocetin cofactor activity (measures vWF functionality)',
      'Factor VIII clotting activity test',
      'Von Willebrand factor multimers (evaluates vWF structure)',
    ],

    management: [
      'Desmopressin (synthetic hormone stimulating vWF production)',
      'Replacement therapies (transfusions of concentrated clotting factors)',
      'Anti-fibrinolytic medications (stabilizes blood clots)',
      'Oral Contraceptives (to control heavy menstrual periods)',
    ],

    whenToConsultDoctor:
      "Visit your doctor if you are experiencing prolonged bleeding which is difficult to stop.",
  },

  'type-1-diabetes': {
    title: "Type 1 Diabetes",

    description:
      "Type 1 (juvenile or insulin-dependent) diabetes is a serious condition where the pancreas produces little to no insulin. Without insulin, glucose builds up in the bloodstream instead of entering cells for energy. It mostly appears in childhood/adolescence but can develop in adulthood.",

    causes:
      "Caused by a faulty immune response destroying insulin-producing Beta cells in the pancreas. Contributing factors include familial genetics, viral triggers, and flawed cell signaling.",

    riskFactors: [
      'Family history and genetics',
      'Age (more common in younger populations, though age increases general diabetes risk)',
      'Certain racial/ethnic backgrounds (African-American, Hispanic, Native American)',
      'Medical conditions like Hypertension, PCOS, high cholesterol, and stress',
    ],

    symptoms: [
      'Frequent urination and increased thirst',
      'Sudden bed-wetting in children',
      'Unintentional weight loss, extreme hunger',
      'Blurred vision, fatigue, and irritability',
      'Emergency signs: Rapid breathing, belly pain, fruity breath, confusion, loss of consciousness',
    ],

    diagnosis: [
      'Glycated hemoglobin (A1C) test',
      'Random blood sugar test',
      'Fasting blood sugar test',
      'Tests for autoantibodies (to differentiate from Type 2 diabetes)',
    ],

    management: [
      'Taking insulin shots (Rapid-acting, Short-acting, Intermediate-acting, Long-acting)',
      'Adjusting diet and physical activity',
      'Continuous blood sugar monitoring',
    ],

    whenToConsultDoctor:
      "Consult a doctor if blood sugar is unmanaged despite medication, or to address complications like Diabetic Nephropathy (kidney), Neuropathy (nerves), Retinopathy (eyes), and Diabetic Foot issues.",
  },

  'vertigo': {
    title: "Vertigo",

    description:
      "Vertigo is a medical condition describing a feeling of being off-balance, where a person feels as if the world around them is spinning. It is caused by problems in the inner ear or brain, making simple tasks like standing difficult, and can lead to anxiety.",

    causes:
      "Causes include inner ear issues, ear surgeries, migraines, head injuries, medication side-effects, prolonged bed rest, strokes, and occasionally looking down from heights.",

    riskFactors: [
      'Age over 50 and Female gender',
      'Head injury',
      'Prolonged use of anti-depressants or anti-psychotics',
      'Family history of vertigo',
      'Emotional distress or underlying balance-affecting conditions',
    ],

    symptoms: [
      'Sensation of spinning, tilting, or being unbalanced',
      'Inclination to fall towards one side',
      'Nausea, vomiting, and sweating',
      'Headache and Jerky eye movements',
      'Tinnitus (ringing in the ears)',
    ],

    diagnosis: [
      'Detailed medical and family history',
      'Thorough ear and eye examinations',
      'Symptom assessment tracking triggers and previous therapeutic measures',
    ],

    management: [
      'Antiemetics for nausea and vomiting',
      'Antihistamines for migraine-related vertigo',
      'Antibiotics/antivirals for underlying ear infections',
      'Surgery of the inner ear or brain in extreme conditions',
      'Precautions: getting up slowly, using a walking stick, avoiding heights/driving during dizziness',
    ],

    whenToConsultDoctor:
      "Consult a doctor if the condition worsens, severely impairs daily tasks, causes frequent injuries from falls, or if episodes significantly increase in severity.",
  },

  'vulvo-vaginal-candidiasis': {
    title: "Vulvo-Vaginal Candidiasis",

    description:
      "Vulvo-vaginal candidiasis is a common fungal yeast infection affecting the vulva and vagina, experienced by nearly 3/4 of women. It causes white, curd-like discharge, intense burning, irritation, and itchy rashes on the surrounding tissues.",

    causes:
      "Primarily caused by Candida albicans overgrowth. Triggers include bacterial vaginosis (disrupted flora), injuries, Trichomoniasis, sexually transmitted infections, and inflammatory vaginitis.",

    riskFactors: [
      'Pregnancy',
      'Diabetes (raised blood sugar levels)',
      'Use of hormonal contraceptives (birth control pills)',
      'Immunosuppression and steroid treatments',
      'Chemotherapy or recent antibiotic usage',
      'Iron deficiency anemia and underlying skin conditions (psoriasis, lichen sclerosis)',
    ],

    symptoms: [
      'Itching, irritation, and soreness in the vagina/vulva',
      'Burning sensation aggravating on intercourse and urination',
      'Redness, swelling, and vaginal rash',
      'Thick, white, odor-free, curd-like vaginal discharge (or watery discharge)',
      'Vulval edema and excoriations (from scratching/picking)',
    ],

    diagnosis: [
      'Detailed medical and sexual history',
      'Physical examination of the affected area',
      'Laboratory tests/swabs to confirm fungal overgrowth',
    ],

    management: [
      'Topical antifungal ointments applied to the skin',
      'Vaginal antifungal tablets',
      'Oral antifungal medicines',
    ],

    whenToConsultDoctor:
      "Consult a doctor if it is your first yeast infection, symptoms don't resolve with antifungal meds, new symptoms appear, the infection spreads, or you feel general uneasiness.",
  },

  'type-2-diabetes': {
    title: "Type 2 Diabetes",

    description:
      "Type-2 diabetes is the most common form of diabetes, characterized by abnormally high levels of glucose in the blood. It occurs when cells become insulin resistant, leading to glucose accumulation. In later stages, the pancreas produces less insulin.",

    causes:
      "Caused by insulin resistance (cells fail to use insulin properly), decreased insulin production by Beta cells, poor cell signaling, and genetics.",

    riskFactors: [
      'Un-modifiable: Family history, Age >45, Specific ethnicities (African-American, Hispanic, Native American)',
      'Modifiable: Obesity (especially abdominal fat), lack of exercise, unhealthy diets, smoking, stress, sleep disturbances',
      'Medical conditions: Hypertension, PCOS, high cholesterol, pregnancy diabetes, Acanthosis Nigricans',
    ],

    symptoms: [
      'Increased thirst and frequent urination',
      'Weight loss and increased hunger',
      'Blurred vision and fatigue',
      'Delayed wound healing',
      'Dark patches on skin and armpits',
    ],

    diagnosis: [
      'Random blood sugar (RBS) test',
      'Fasting blood sugar (FBS) test',
      'HbA1c (Glycated hemoglobin) test',
      'Oral glucose tolerance test (OGTT)',
    ],

    management: [
      'Lifestyle modifications: strict diet, regular exercise, weight loss',
      'Medicines: Metformin (drug of choice), insulin, sulfonylureas, thiazolidinedione, DPP-4 inhibitors, SGLT2 inhibitors, GLP-1 analogs',
    ],

    whenToConsultDoctor:
      "Consult your doctor if medicines are not improving the condition or worsening it, or if you experience signs of heart problems, vision issues, or stroke.",
  },

  'urinary-disorder': {
    title: "Urinary Disorder",

    description:
      "Urinary disorders encompass any diseases or conditions affecting the kidneys, bladder, ureters, or their general function. Examples include kidney stones, urinary tract cancer, kidney failure, and incontinence.",

    causes:
      "Causes are highly varied and include sexually transmitted infections (Gonorrhea, Chlamydia causing urethritis) and physical trauma causing urethral inflammation.",

    riskFactors: [
      'Birth defects and systemic diseases',
      'Cigarette smoking and Diabetes',
      'Genital piercing and unsafe sexual practices',
      'Chemical exposures and use of spermicides',
      'Low fluid intake and trauma',
    ],

    symptoms: [
      'Cloudy or foul-smelling urine',
      'Bloody urine',
      'Abdominal cramping and pain',
      'Pain during sexual intercourse',
      'Severe nausea and vomiting',
    ],

    diagnosis: [
      'Medical history and targeted urinary/blood lab tests (depending on specific symptoms)',
    ],

    management: [
      'Condition-specific medical or surgical management as advised by a doctor',
    ],

    whenToConsultDoctor:
      "Consult your doctor when any of the symptoms start showing.",
  },

  'vitamin-d-deficiency': {
    title: "Vitamin D Deficiency",

    description:
      "Vitamin D is a fat-soluble vitamin essential for strong bones, calcium absorption, and immune strength. A deficiency means body levels drop below 30 nmol/l (normal is 50-125 nmol/l), causing harmful effects like bone pain and weakness.",

    causes:
      "Causes include inadequate exposure to sunlight (responsible for 80% of Vitamin D), poor diet, darker skin colors (produces less Vitamin D), obesity (absorbs Vitamin D into fat), kidney disease, and GI diseases (Celiac, Crohn’s).",

    riskFactors: [
      'Inadequate sunlight exposure',
      'Old age (skin is less sensitive to making Vitamin D)',
      'Gastrointestinal diseases causing malabsorption',
      'Medicines (antifungals, glucocorticoids, anticonvulsants)',
    ],

    symptoms: [
      'Lethargy, tiredness, and fatigue',
      'Bone pain and muscle weakness',
      'Dry skin, eczema, and psoriasis',
      'Reduced immunity and cognitive impairment',
      'Osteoporosis, Osteomalacia (softening of bones), and Rickets',
    ],

    diagnosis: [
      'Complete medical history and physical exam',
      'X-rays to check for bone abnormalities',
      'Blood tests (CBC, serum calcium, and phosphate levels)',
    ],

    management: [
      'Increased sunlight exposure',
      'Dietary sources: Dairy products, soy milk, egg yolk, tuna, salmon, sardines, fish/cod liver oils',
      'Vitamin D supplements',
    ],

    whenToConsultDoctor:
      "Consult a doctor if the condition persists/worsens, or if you experience nausea, vomiting, weakness, or loss of appetite after using vitamin supplements.",
  },

  'worm-infections': {
    title: "Worm Infections",

    description:
      "Worm infections are macro-parasitic diseases where parasitic worms (tapeworms, roundworms, flukes) infect the human body, typically reproducing and growing inside the intestines.",

    causes:
      "Primarily caused by eating undercooked meat from infected animals (pig, cow, fish). Other causes include consuming contaminated water/soil and poor hygiene/sanitation.",

    riskFactors: [
      'Children (playing in contaminated environments/soil)',
      'Older people (weakened immune systems)',
    ],

    symptoms: [
      'Diarrhea and nausea/vomiting',
      'Abdominal pain, bloating, and gas',
      'Fatigue and tenderness',
      'Unexplained weight loss',
    ],

    diagnosis: [
      'Stool sample examinations (may require several samples to confirm worms)',
      'Blood tests and X-rays',
    ],

    management: [
      'Anti-parasitic medicines, usually class medications like Mebendazole',
    ],

    whenToConsultDoctor:
      "Consult your doctor when symptoms start showing and you continuously lose weight.",
  }

};
