// STAY HOME - Game Data Configuration
// This file contains all narrative content for easy updates

export const GAME_CONFIG = {
  dayDuration: 300, // 5 minutes in seconds
  startTime: 8, // 08:00
  endTime: 20, // 20:00
  totalGameHours: 12, // 08:00 to 20:00
  anxietyThresholds: {
    safe: 30,
    worried: 60,
    panic: 80,
    critical: 100
  }
};

export const CHARACTERS = {
  mom: {
    id: 'mom',
    name: 'Your Mom',
    avatar: '👩',
    baseAnxiety: 20,
    color: '#ffb000',
    endings: {
      aliveAndWell: "She navigated the chaos with a steady hand. Though the days were dark, she kept her composure and made it through.",
      traumatized: "You made her aware of every danger, every risk. She survived, but the weight of your warnings left deep scars.",
      deceased: {
        day1: "She ventured out for medicine on Day 1. She never made it back home.",
        day2: "The stress and fear became too much. She didn't survive Day 2.",
        day3: "So close to the end, but the final hours proved too much. She passed on Day 3."
      }
    }
  },
  boyfriend: {
    id: 'boyfriend',
    name: 'Your Partner',
    avatar: '👨',
    baseAnxiety: 15,
    color: '#00ff41',
    endings: {
      aliveAndWell: "He kept his head down and followed your guidance. When the dust settled, he was still standing.",
      traumatized: "He made it out alive, but the things he witnessed changed him. The nightmares won't stop.",
      deceased: {
        day1: "He opened the door for his friend Mike on Day 1. It was the last mistake he ever made.",
        day2: "Trapped in his apartment with no power, he couldn't escape what came for him on Day 2.",
        day3: "He held on as long as he could, but the final night took him. His last message said he loved you."
      }
    }
  },
  bestie: {
    id: 'bestie',
    name: 'Your Best Friend',
    avatar: '👤',
    baseAnxiety: 25,
    color: '#00ffff',
    endings: {
      aliveAndWell: "She followed your instructions perfectly. She's currently safe with her family, shaken but unharmed.",
      traumatized: "She made it out, but the things she saw broke something inside her. She survived, but she's not the same.",
      deceased: {
        day1: "She panicked on the first day and tried to leave the city. She was caught in the chaos.",
        day2: "Signal was lost on Day 2. Last known location was near the pharmacy. Heavy casualties reported in that area.",
        day3: "She waited until the end, hoping for rescue. When none came, she made a choice. She didn't make it."
      }
    }
  }
};

export const FEED_POSTS = [
  // DAY 1 - From CSV data
  {
    id: 'post_1',
    day: 1,
    author: 'Dept. of Health',
    timestamp: '08:15',
    content: 'Seasonal flu cases are trending higher than average this week. Remember to wash hands and stay home if symptomatic.',
    sourceUrl: 'https://publichealth.gov/advisories',
    isVerified: true,
    factCheck: {
      reliability: 'High',
      notes: 'Standard language. Matches annual reports from 2022-2024.',
      sourceType: 'Verified government account managed by the Public Information Office.',
      sourceReliability: 'This is the official federal health portal. The domain registry was last updated in 2018 and is secured by government-tier encryption.'
    }
  },
  {
    id: 'post_2',
    day: 1,
    author: 'Sarah J.',
    timestamp: '09:22',
    content: 'Ugh, traffic is nightmare on 4th Ave. Why are there so many ambulances?? I\'m gonna be late for work 😡',
    sourceUrl: null,
    isVerified: false,
    factCheck: {
      reliability: 'Moderate',
      notes: 'Geolocation matches. "Ambulances" keyword mentions are up 300% in this specific sector.',
      sourceType: 'Age 24, lives in Downtown Metro. Frequent poster on local traffic groups.',
      sourceReliability: 'N/A: No external link provided.'
    }
  },
  {
    id: 'post_3',
    day: 1,
    author: 'City News 24',
    timestamp: '10:05',
    content: 'BREAKING: Police reporting a "disturbance" at Central Hospital. Access to ER is temporarily restricted.',
    sourceUrl: 'https://citynews24-live.com/local',
    isVerified: true,
    factCheck: {
      reliability: 'High',
      notes: '"Disturbance" is a euphemism. Police scanner traffic indicates "Violent Assault" codes being used.',
      sourceType: 'Local news affiliate. High reliability rating, though funding has been cut recently.',
      sourceReliability: 'A verified local news outlet. However, this specific page is a "Live Blog" which is updated by field reporters without full editorial review.'
    }
  },
  {
    id: 'post_4',
    day: 1,
    author: 'CatLovers',
    timestamp: '11:30',
    content: 'Look at Mr. Mittens trying to fit in the box! If I fits, I sits. 😻',
    sourceUrl: null,
    isVerified: false,
    factCheck: {
      reliability: 'High',
      notes: 'No safety data detected. Cute cat.',
      sourceType: 'Account age: 4 years. Posts exclusively about feline care and adoption.',
      sourceReliability: 'N/A: No external link provided.'
    }
  },
  {
    id: 'post_5',
    day: 1,
    author: 'Michael B.',
    timestamp: '12:15',
    content: 'Just saw a guy tackle a nurse outside the ER. Like, full on tackle. People are losing it.',
    sourceUrl: null,
    isVerified: false,
    factCheck: {
      reliability: 'Moderate',
      notes: 'Matches City News report.',
      sourceType: 'Age 37, you have 3 mutual friends. Works in construction near the hospital district.',
      sourceReliability: 'N/A: No external link provided.'
    }
  },
  {
    id: 'post_6',
    day: 1,
    author: 'Dr. A. Vance',
    timestamp: '13:40',
    content: 'I am seeing reports of a novel neurological symptom in admitted patients. High fever + extreme aggression. Colleagues, please DM.',
    sourceUrl: 'https://med-forum.net/neurology/thread-449',
    isVerified: true,
    factCheck: {
      reliability: 'Moderate',
      notes: 'Medical terminology is accurate. This description does not match any known flu symptoms.',
      sourceType: 'Licensed Neurologist at Central Hospital. Account usually inactive. Sudden activity spike.',
      sourceReliability: 'A restricted discussion board for licensed medical professionals. Access requires NPI verification, suggesting high credibility for technical discussions.'
    }
  },
  {
    id: 'post_7',
    day: 1,
    author: 'The Patriot',
    timestamp: '14:20',
    content: 'They are mobilizing the National Guard in the north. I have photos. Why isn\'t the news showing this??',
    sourceUrl: 'https://freedom-eagle-watch.org/news',
    isVerified: false,
    factCheck: {
      reliability: 'FAKE',
      notes: 'Image reverse search shows these are old photos from a flood relief operation in 2021.',
      sourceType: 'Account created in 2021. Flagged 12 times for misleading content in the last 6 months.',
      sourceReliability: 'Privately hosted blog. Rated "Low Credibility" by media watchdogs due to a history of sensationalist headlines.'
    }
  },
  {
    id: 'post_8',
    day: 1,
    author: 'Lisa M.',
    timestamp: '15:05',
    content: 'Does anyone else have a splitting headache today? Is it the weather?',
    sourceUrl: null,
    isVerified: false,
    factCheck: {
      reliability: 'Moderate',
      notes: '"Headache" keyword mentions are up 400% in the local area today. This may not be imagined.',
      sourceType: 'Student at City College. Often posts about academic stress.',
      sourceReliability: 'N/A: No external link provided.'
    }
  },
  {
    id: 'post_9',
    day: 1,
    author: 'TechGizmo',
    timestamp: '16:30',
    content: 'Review: The new smartphone camera is insane. Zoomed in on a bird from 100ft away.',
    sourceUrl: 'https://techgizmo-reviews.com/mobile',
    isVerified: false,
    factCheck: {
      reliability: 'High',
      notes: 'This is a paid advertisement. Irrelevant to current events.',
      sourceType: 'Commercial aggregator for tech reviews. Known for sponsored content.',
      sourceReliability: 'A legitimate commercial website, but the content is algorithmically generated to drive ad revenue.'
    }
  },
  {
    id: 'post_10',
    day: 1,
    author: 'Gov. Official',
    timestamp: '16:45',
    content: 'False information is being spread on many social media platforms at this time. Please rely on official channels for updates. Be mindful. Be safe.',
    sourceUrl: 'https://gov.press.release/statements',
    isVerified: true,
    factCheck: {
      reliability: 'High',
      notes: 'False information is a known epidemic during times of stress.',
      sourceType: 'Public Relations Officer for the Mayor. Account verified since 2019.',
      sourceReliability: 'Official municipal archive. Note that press releases here are often drafted hours before publication.'
    }
  },
  {
    id: 'post_11',
    day: 1,
    author: 'Kyle R.',
    timestamp: '17:10',
    content: 'My roommate just locked himself in his room. He\'s screaming at the wall. Should I call the cops?',
    sourceUrl: null,
    isVerified: false,
    factCheck: {
      reliability: 'Moderate',
      notes: 'Matches "aggressive behavior" reports from the hospital.',
      sourceType: 'College student. History of gaming posts. No record of political activity.',
      sourceReliability: 'N/A: No external link provided.'
    }
  },
  {
    id: 'post_12',
    day: 1,
    author: 'MemeLord69',
    timestamp: '17:25',
    content: 'Me walking into work while the world ends like...',
    sourceUrl: null,
    isVerified: false,
    factCheck: {
      reliability: 'High',
      notes: 'High virality. People are using humor as a coping mechanism.',
      sourceType: 'High engagement account (50k followers). Often reposts content from other platforms.',
      sourceReliability: 'N/A: No external link provided.'
    }
  },
  {
    id: 'post_13',
    day: 1,
    author: 'Local_PD',
    timestamp: '17:50',
    content: 'ADVISORY: Please keep 911 lines clear for life-threatening emergencies only. Do not call to report noise complaints.',
    sourceUrl: 'https://police.dept-services.gov/advisories',
    isVerified: true,
    factCheck: {
      reliability: 'High',
      notes: 'Call volume is currently 5x normal capacity.',
      sourceType: 'Official Police Department feed.',
      sourceReliability: 'Official law enforcement channel. Alerts posted here are high-priority.'
    }
  },
  {
    id: 'post_14',
    day: 1,
    author: 'Jessica K.',
    timestamp: '18:05',
    content: 'Anyone know why the subway is stopped? Conductor says "technical difficulties" but what does that even mean',
    sourceUrl: null,
    isVerified: false,
    factCheck: {
      reliability: 'Moderate',
      notes: 'Metro authority has NOT issued a stoppage alert. Discrepancy detected.',
      sourceType: 'Last active location: Red Line Metro Station, Stop 4.',
      sourceReliability: 'N/A: No external link provided.'
    }
  },
  {
    id: 'post_15',
    day: 1,
    author: 'Daily Recipes',
    timestamp: '18:20',
    content: '5-Minute Pasta for when you\'re too tired to cook! 🍝',
    sourceUrl: 'https://dailyrecipes.com/quick-meals',
    isVerified: false,
    factCheck: {
      reliability: 'High',
      notes: 'Automated post regardless of current events.',
      sourceType: 'Automated bot account. Posts every 4 hours regardless of context.',
      sourceReliability: 'A lifestyle blog with high ad density.'
    }
  },
  {
    id: 'post_16',
    day: 1,
    author: 'Anonymous',
    timestamp: '18:45',
    content: "It's not a virus. It's a frequency. Put your phone in the microwave (don't turn it on). It blocks the signal.",
    sourceUrl: 'https://4chan-archive.org/pol/thread-992',
    isVerified: false,
    factCheck: {
      reliability: 'FAKE',
      notes: 'Conspiracy theory originating from 5G scares.',
      sourceType: 'Account created today. No profile picture.',
      sourceReliability: 'An imageboard known for anonymous posting. While leaks sometimes occur here, it is primarily a hub for trolling, disinformation, and pranks.'
    }
  },
  {
    id: 'post_17',
    day: 1,
    author: 'Emily W.',
    timestamp: '19:00',
    content: 'Just picked up the kids from school. They said a teacher fell asleep in class?? What is going on with our schools nowadays...',
    sourceUrl: null,
    isVerified: false,
    factCheck: {
      reliability: 'Moderate',
      notes: 'Matches descriptions of "catatonic states" reported in early medical leaks.',
      sourceType: 'Mother of two. President of the local PTA.',
      sourceReliability: 'N/A: No external link provided.'
    }
  },
  {
    id: 'post_18',
    day: 1,
    author: 'Global News',
    timestamp: '19:15',
    content: 'President to address the nation at 9 PM regarding "Public Safety Measures."',
    sourceUrl: 'https://globalnews.net/politics',
    isVerified: true,
    factCheck: {
      reliability: 'High',
      notes: 'Confirmed schedule.',
      sourceType: 'International news outlet. Corporate owned.',
      sourceReliability: 'Highly regulated and unlikely to publish unverified rumors, but may withhold sensitive info.'
    }
  },
  {
    id: 'post_19',
    day: 1,
    author: 'David T.',
    timestamp: '19:30',
    content: "Lol my neighbor is boarding up his windows. It's just a bad flu season, chill out boomer.",
    sourceUrl: null,
    isVerified: false,
    factCheck: {
      reliability: 'Moderate',
      notes: 'User previously downplayed the 2020 pandemic.',
      sourceType: 'Age 55. Previously posted anti-mask content during Covid-19.',
      sourceReliability: 'N/A: No external link provided.'
    }
  },
  {
    id: 'post_20',
    day: 1,
    author: 'Dept. of Defense',
    timestamp: '19:45',
    content: 'Military exercises scheduled for this weekend in the urban sector are routine. Do not be alarmed by vehicle movement.',
    sourceUrl: 'https://publicsafety.us-gov.alerts/update',
    isVerified: true,
    factCheck: {
      reliability: 'Moderate',
      notes: 'This announcement appears to be retroactive.',
      sourceType: 'Official Pentagon Press Secretary account.',
      sourceReliability: 'Official government update portal. The domain registry is secured by government-tier encryption.'
    }
  },
  // DAY 2 - Keep existing
  {
    id: 'feed_6',
    day: 2,
    author: 'WhiteHouse_Press',
    authorVerified: false,
    text: 'STAY INDOORS. Do not open doors for anyone. Military assistance has been deployed.',
    mediaUrl: null,
    sourceUrl: 'whitehouse.gov.mirror.tk',
    factCheckData: {
      sourceType: 'Suspicious Domain',
      reliability: 'LIKELY FAKE',
      notes: 'Domain .tk is not official government. Possible phishing.'
    },
    unlockCondition: 'day_2',
    timestamp: '06:00 AM'
  },
  {
    id: 'feed_7',
    day: 2,
    author: 'FEMA_Response',
    authorVerified: true,
    text: 'Emergency shelters opening in designated zones. Check local listings. Bring 3 days supplies.',
    mediaUrl: null,
    sourceUrl: 'fema.gov/emergency-2024',
    factCheckData: {
      sourceType: 'Federal Agency',
      reliability: 'High - Official source',
      notes: 'Verified government account. Links to official .gov domain.'
    },
    unlockCondition: 'day_2',
    timestamp: '07:30 AM'
  },
  {
    id: 'feed_8',
    day: 2,
    author: 'survivor_network',
    authorVerified: false,
    text: 'DO NOT GO TO SHELTERS. They\'re quarantine zones. My brother went in, hasn\'t been heard from since.',
    mediaUrl: null,
    sourceUrl: null,
    factCheckData: {
      sourceType: 'Anonymous Network',
      reliability: 'Unverifiable',
      notes: 'Contradicts official guidance. Fear-based messaging.'
    },
    unlockCondition: 'chat_boyfriend_1',
    timestamp: '09:15 AM'
  },
  {
    id: 'feed_9',
    day: 2,
    author: 'flight_tracker_bot',
    authorVerified: false,
    text: 'NOTICE: All commercial flights grounded. Military aircraft activity increased 400% over urban centers.',
    mediaUrl: null,
    sourceUrl: 'flightaware.mirror/data',
    factCheckData: {
      sourceType: 'Automated Tracker',
      reliability: 'Data source uncertain',
      notes: 'Links to mirror site, not official FlightAware.'
    },
    unlockCondition: 'chat_bestie_1',
    timestamp: '10:45 AM'
  },
  {
    id: 'feed_10',
    day: 2,
    author: 'neighbor_watch_group',
    authorVerified: false,
    text: 'Anyone else hearing screaming from down the block? Should we check on them?',
    mediaUrl: null,
    sourceUrl: null,
    factCheckData: {
      sourceType: 'Local Community Group',
      reliability: 'Real-time unverified',
      notes: 'Local account. Claims cannot be independently verified.'
    },
    unlockCondition: 'chat_boyfriend_2',
    timestamp: '02:30 PM'
  },
  // DAY 3 - Keep existing
  {
    id: 'feed_11',
    day: 3,
    author: 'EMERGENCY_BROADCAST',
    authorVerified: false,
    text: '/// SIGNAL INTERRUPT /// DO NOT TRUST PREVIOUS BROADCASTS /// STAY INSIDE /// TRUST NO ONE ///',
    mediaUrl: null,
    sourceUrl: null,
    factCheckData: {
      sourceType: 'Unknown Origin',
      reliability: 'CANNOT DETERMINE',
      notes: 'Broadcast source unknown. Could be interference or hoax.'
    },
    unlockCondition: 'day_3',
    timestamp: '04:00 AM'
  },
  {
    id: 'feed_12',
    day: 3,
    author: 'last_transmission',
    authorVerified: false,
    text: 'If you\'re reading this, the network is still up. Don\'t answer the door. They look normal but they\'re not.',
    mediaUrl: null,
    sourceUrl: null,
    factCheckData: {
      sourceType: 'Final Post - Account Deleted',
      reliability: 'Unknown',
      notes: 'Account no longer exists. Message cached before deletion.'
    },
    unlockCondition: 'chat_mom_3',
    timestamp: '05:22 AM'
  },
  {
    id: 'feed_13',
    day: 3,
    author: 'military_insider',
    authorVerified: false,
    text: 'Evacuation routes compromised. If you haven\'t left by now, shelter in place is your only option.',
    mediaUrl: null,
    sourceUrl: 'leaked.docs.onion',
    factCheckData: {
      sourceType: 'Anonymous Leaker',
      reliability: 'Unverifiable',
      notes: 'Links to dark web. Cannot confirm military connection.'
    },
    unlockCondition: 'chat_bestie_2',
    timestamp: '08:00 AM'
  },
  {
    id: 'feed_14',
    day: 3,
    author: 'static_feed',
    authorVerified: false,
    text: '... ... ... signal lost ... ... ... good luck ... ... ...',
    mediaUrl: null,
    sourceUrl: null,
    factCheckData: {
      sourceType: 'System Message',
      reliability: 'N/A',
      notes: 'Automated message. Network degradation detected.'
    },
    unlockCondition: 'ending_trigger',
    timestamp: '11:59 PM'
  }
];

export const CHAT_DATA = {
  mom: {
    day1: [
      {
        id: 'mom_1_1',
        triggerTime: 8.5, // 08:30
        text: "Honey, are you seeing the news? Aunt Linda says they closed the downtown bridge. Is that true?",
        options: [
          {
            id: 'mom_1_1_a',
            text: "Yes, I saw the alert. Just stay inside",
            anxietyScore: 5,
            nextTrigger: 'mom_1_2'
          },
          {
            id: 'mom_1_1_b',
            text: "Probably just construction, don't worry.",
            anxietyScore: -5,
            nextTrigger: 'mom_1_2'
          }
        ]
      },
      {
        id: 'mom_1_2',
        text: "I'm worried about your father coming home from work. He takes the subway. People are saying it's stopped?",
        options: [
          {
            id: 'mom_1_2_a',
            text: "Tell him to walk. Subway is unsafe",
            anxietyScore: 5,
            nextTrigger: 'mom_1_3'
          },
          {
            id: 'mom_1_2_b',
            text: "It's just a delay. He'll be fine.",
            anxietyScore: -5,
            nextTrigger: 'mom_1_3'
          }
        ]
      },
      {
        id: 'mom_1_3',
        text: "Okay, he just texted me, he's walking. But I'm hearing sirens non-stop past the house. It sounds like a war zone.",
        options: [
          {
            id: 'mom_1_3_a',
            text: "Are you watching TV? Check the news",
            anxietyScore: 5,
            nextTrigger: 'mom_1_4'
          },
          {
            id: 'mom_1_3_b',
            text: "Lock the doors, Mom. Seriously.",
            anxietyScore: 10,
            nextTrigger: 'mom_1_4'
          }
        ]
      },
      {
        id: 'mom_1_4',
        text: "The news says \"flu season.\" But I saw that video of the trucks. Why would they send trucks for the flu?",
        options: [
          {
            id: 'mom_1_4_a',
            text: "That video is fake, Mom. Old footage. Don't believe everything you see online.",
            anxietyScore: -10,
            nextTrigger: 'mom_1_5'
          },
          {
            id: 'mom_1_4_b',
            text: "I know. They are hiding something for sure.",
            anxietyScore: 20,
            nextTrigger: 'mom_1_5'
          }
        ]
      },
      {
        id: 'mom_1_5',
        text: "I need to go to the pharmacy. Your dad is out of his heart meds. Should I go now before it gets dark?",
        options: [
          {
            id: 'mom_1_5_a',
            text: "NO. Stay home. We can manage.",
            anxietyScore: 10,
            nextTrigger: 'mom_1_end_a'
          },
          {
            id: 'mom_1_5_b',
            text: "Yeah, go quickly, it'll be okay. But come right back.",
            anxietyScore: -5,
            isLethal: false,
            nextTrigger: 'mom_1_end_b'
          }
        ]
      },
      {
        id: 'mom_1_end_a',
        text: "Fine. I'll ration what he has left. I hope this situation will be over soon.",
        isFinal: true
      },
      {
        id: 'mom_1_end_b',
        text: "Okay, grabbing my keys. I'll talk to you later.",
        isFinal: true
      }
    ],
    day2: [
      {
        id: 'chat_mom_2',
        text: 'The power flickered twice. Your father is pacing. He keeps talking about "getting to you."',
        isPlayer: false,
        triggerTime: 8.0, // 08:00 Day 2
        options: [
          {
            id: 'mom_2_a',
            text: 'Please keep him there. The roads aren\'t safe. I\'m FINE.',
            anxietyScore: -10,
            isLethal: false,
            nextTrigger: 'chat_mom_2_response_a'
          },
          {
            id: 'mom_2_b',
            text: 'Maybe you should both try to get here? We could be together.',
            anxietyScore: +20,
            isLethal: false,
            nextTrigger: 'chat_mom_2_travel'
          }
        ]
      },
      {
        id: 'chat_mom_2_response_a',
        text: 'Okay. We\'ll stay. The news is showing fires downtown. Are you near downtown?',
        isPlayer: false,
        options: [
          {
            id: 'mom_2a_a',
            text: 'I\'m far enough. Keep doors locked and stay away from windows.',
            anxietyScore: -5,
            isLethal: false,
            nextTrigger: 'chat_mom_day2_end_safe'
          },
          {
            id: 'mom_2a_b',
            text: 'I can hear sirens from here too. This is everywhere.',
            anxietyScore: +10,
            isLethal: false,
            nextTrigger: 'chat_mom_day2_end_worried'
          }
        ]
      },
      {
        id: 'chat_mom_2_travel',
        text: 'We\'re packing now. Should we leave before dark or wait until morning?',
        isPlayer: false,
        options: [
          {
            id: 'mom_2t_a',
            text: 'Wait until morning. Don\'t travel at night.',
            anxietyScore: +5,
            isLethal: false,
            nextTrigger: 'chat_mom_day2_end_worried'
          },
          {
            id: 'mom_2t_b',
            text: 'Actually, DON\'T come. It\'s too dangerous. Stay there.',
            anxietyScore: -10,
            isLethal: false,
            nextTrigger: 'chat_mom_day2_end_safe'
          }
        ]
      },
      {
        id: 'chat_mom_day2_end_safe',
        text: 'We\'ll do whatever you think is best. You\'ve been right so far. Love you.',
        isPlayer: false,
        isFinal: true
      },
      {
        id: 'chat_mom_day2_end_worried',
        text: 'This is getting scary. I\'ll text you if anything changes. Please be careful.',
        isPlayer: false,
        isFinal: true
      }
    ],
    day3: [
      {
        id: 'chat_mom_3',
        text: 'Someone is knocking on the door. They\'re saying they\'re from the government. Should we open it?',
        isPlayer: false,
        triggerTime: 8.0, // 08:00 Day 3
        options: [
          {
            id: 'mom_3_a',
            text: 'DO NOT OPEN THAT DOOR. Ask for ID through the window.',
            anxietyScore: -15,
            isLethal: false,
            nextTrigger: 'chat_mom_3_safe'
          },
          {
            id: 'mom_3_b',
            text: 'If it\'s really the government, maybe they can help.',
            anxietyScore: +25,
            isLethal: false,
            nextTrigger: 'chat_mom_3_door'
          }
        ]
      },
      {
        id: 'chat_mom_3_safe',
        text: 'They left. It didn\'t look right. Thank you for warning me. We\'re going to the basement.',
        isPlayer: false,
        options: [
          {
            id: 'mom_3s_a',
            text: 'Good. Stay there. Keep the phone charged. I love you.',
            anxietyScore: -20,
            isLethal: false,
            nextTrigger: 'chat_mom_end_good'
          },
          {
            id: 'mom_3s_b',
            text: 'Is there food and water down there? You might be there a while.',
            anxietyScore: -10,
            isLethal: false,
            nextTrigger: 'chat_mom_end_good'
          }
        ]
      },
      {
        id: 'chat_mom_3_door',
        text: 'Your father opened the door. They pushed inside. They\'re not from the government.',
        isPlayer: false,
        options: [
          {
            id: 'mom_3d_a',
            text: 'HIDE! Get to the basement! Don\'t make a sound!',
            anxietyScore: +30,
            isLethal: false,
            nextTrigger: 'chat_mom_end_uncertain'
          },
          {
            id: 'mom_3d_b',
            text: 'Get out of the house! Run to the neighbors!',
            anxietyScore: +40,
            isLethal: true,
            nextTrigger: 'chat_mom_end_bad'
          }
        ]
      },
      {
        id: 'chat_mom_end_good',
        text: 'Signal is weak down here. We have supplies. We\'ll wait. Stay safe, my baby. 💛',
        isPlayer: false,
        isFinal: true
      },
      {
        id: 'chat_mom_end_uncertain',
        text: 'hiding now. cant type. love you',
        isPlayer: false,
        isFinal: true
      },
      {
        id: 'chat_mom_end_bad',
        text: '[User has gone offline]',
        isPlayer: false,
        isFinal: true
      }
    ]
  },
  boyfriend: {
    day1: [
      {
        id: 'bf_1_1',
        triggerTime: 10.0, // 10:00
        text: "Babe, this traffic is insane. I've been stuck on 4th Ave for an hour. People are honking like crazy.",
        options: [
          {
            id: 'bf_1_1_a',
            text: "Stay in the car, don't get out!",
            anxietyScore: 5,
            nextTrigger: 'bf_1_2'
          },
          {
            id: 'bf_1_1_b',
            text: "Maybe check what's happening? Maybe they closed the road for construction again",
            anxietyScore: -5,
            nextTrigger: 'bf_1_2'
          }
        ]
      },
      {
        id: 'bf_1_2',
        text: "Some guy just ran past my car screaming. I think he was bleeding? Wtf is going on?",
        options: [
          {
            id: 'bf_1_2_a',
            text: "Please just turn around and come to my place.",
            anxietyScore: 10,
            nextTrigger: 'bf_1_3'
          },
          {
            id: 'bf_1_2_b',
            text: "Just lock your doors okay? Maybe there was a fight or something",
            anxietyScore: 20,
            nextTrigger: 'bf_1_3'
          }
        ]
      },
      {
        id: 'bf_1_3',
        text: "My buddy Mike says there's a riot at the hospital. He wants to go out there to help. I dunno, should I go with him?",
        options: [
          {
            id: 'bf_1_3_a',
            text: "Absolutely not, are you for real?? Go home!",
            anxietyScore: 15,
            nextTrigger: 'bf_1_4'
          },
          {
            id: 'bf_1_3_b',
            text: "Okay, just be careful. We don't know what going on",
            anxietyScore: -10,
            nextTrigger: 'bf_1_4'
          }
        ]
      },
      {
        id: 'bf_1_4',
        text: "Damn, my head is pounding. I feel super dizzy",
        options: [
          {
            id: 'bf_1_4_a',
            text: "Stay inside!! Headache is a symptom!",
            anxietyScore: 20,
            nextTrigger: 'bf_1_5'
          },
          {
            id: 'bf_1_4_b',
            text: "Oh no, maybe you need some fresh air? You've been stuck in your car forever",
            anxietyScore: 15,
            nextTrigger: 'bf_1_5'
          }
        ]
      },
      {
        id: 'bf_1_5',
        text: "Finally got home. Mike is on his way, he sounds freaked out. He sounds really weird on the phone",
        options: [
          {
            id: 'bf_1_5_a',
            text: "No, do not let him in! It's not safe!!",
            anxietyScore: 20,
            nextTrigger: 'bf_1_end_a'
          },
          {
            id: 'bf_1_5_b',
            text: "Omg poor Mike. I hope he's okay. You guys should be together, It's safer",
            anxietyScore: 50,
            isLethal: true,
            nextTrigger: 'bf_1_end_b'
          }
        ]
      },
      {
        id: 'bf_1_end_a',
        text: "Well, if you're really sure about it... I guess something is really happening",
        isFinal: true
      },
      {
        id: 'bf_1_end_b',
        text: "Yeah, you're right. I'll let him in, I this he's here",
        isFinal: true
      }
    ],
    day2: [
      {
        id: 'chat_boyfriend_2',
        text: 'Power went out in the building. We\'re using phone flashlights. There\'s banging in the hallway.',
        isPlayer: false,
        triggerTime: 9.0, // 09:00 Day 2
        options: [
          {
            id: 'bf_2_a',
            text: 'Don\'t go out there. Barricade your door with furniture.',
            anxietyScore: -10,
            isLethal: false,
            nextTrigger: 'chat_boyfriend_2_response_a'
          },
          {
            id: 'bf_2_b',
            text: 'It might be someone who needs help. Can you check through the peephole?',
            anxietyScore: +20,
            isLethal: false,
            nextTrigger: 'chat_boyfriend_2_peephole'
          }
        ]
      },
      {
        id: 'chat_boyfriend_2_response_a',
        text: 'Okay. Barricaded. It\'s quiet now. Battery is at 30%. How are you holding up?',
        isPlayer: false,
        options: [
          {
            id: 'bf_2a_a',
            text: 'I\'m okay. Save your battery. Only message if it\'s urgent.',
            anxietyScore: -10,
            isLethal: false,
            nextTrigger: 'chat_boyfriend_day2_end_safe'
          },
          {
            id: 'bf_2a_b',
            text: 'Terrified honestly. When will this be over?',
            anxietyScore: +5,
            isLethal: false,
            nextTrigger: 'chat_boyfriend_day2_end_worried'
          }
        ]
      },
      {
        id: 'chat_boyfriend_2_peephole',
        text: 'I looked. There\'s someone standing there. Not moving. Just... staring at the door.',
        isPlayer: false,
        options: [
          {
            id: 'bf_2p_a',
            text: 'Back away slowly. Get to an interior room. Stay silent.',
            anxietyScore: +10,
            isLethal: false,
            nextTrigger: 'chat_boyfriend_day2_end_worried'
          },
          {
            id: 'bf_2p_b',
            text: 'What do they look like? Are they hurt?',
            anxietyScore: +25,
            isLethal: false,
            nextTrigger: 'chat_boyfriend_day2_end_danger'
          }
        ]
      },
      {
        id: 'chat_boyfriend_day2_end_safe',
        text: 'Will do. I love you. We\'re going to make it.',
        isPlayer: false,
        isFinal: true
      },
      {
        id: 'chat_boyfriend_day2_end_worried',
        text: 'I don\'t know. Just stay hidden. I\'ll message when I can.',
        isPlayer: false,
        isFinal: true
      },
      {
        id: 'chat_boyfriend_day2_end_danger',
        text: 'They don\'t look right. Something is very wrong. Going dark for now.',
        isPlayer: false,
        isFinal: true
      }
    ],
    day3: [
      {
        id: 'chat_boyfriend_3',
        text: 'Made it through the night. Battery at 12%. Heard screaming from the floor below.',
        isPlayer: false,
        triggerTime: 10.0, // 10:00 Day 3
        options: [
          {
            id: 'bf_3_a',
            text: 'Stay quiet. Don\'t investigate. Just hide.',
            anxietyScore: -10,
            isLethal: false,
            nextTrigger: 'chat_boyfriend_3_hide'
          },
          {
            id: 'bf_3_b',
            text: 'Maybe go to the roof? More visible for rescue.',
            anxietyScore: +20,
            isLethal: false,
            nextTrigger: 'chat_boyfriend_3_roof'
          }
        ]
      },
      {
        id: 'chat_boyfriend_3_hide',
        text: 'In the closet. Can hear footsteps in the hall. They stopped at my door.',
        isPlayer: false,
        options: [
          {
            id: 'bf_3h_a',
            text: 'Don\'t move. Don\'t breathe. Wait for them to leave.',
            anxietyScore: +5,
            isLethal: false,
            nextTrigger: 'chat_boyfriend_end_good'
          },
          {
            id: 'bf_3h_b',
            text: 'Can you get to the fire escape?',
            anxietyScore: +20,
            isLethal: false,
            nextTrigger: 'chat_boyfriend_end_uncertain'
          }
        ]
      },
      {
        id: 'chat_boyfriend_3_roof',
        text: 'On the roof. I can see the city. Everything is burning. No helicopters.',
        isPlayer: false,
        options: [
          {
            id: 'bf_3r_a',
            text: 'Get back inside. It\'s too exposed up there.',
            anxietyScore: +10,
            isLethal: false,
            nextTrigger: 'chat_boyfriend_end_uncertain'
          },
          {
            id: 'bf_3r_b',
            text: 'Stay visible. Someone has to see you eventually.',
            anxietyScore: +25,
            isLethal: false,
            nextTrigger: 'chat_boyfriend_end_uncertain'
          }
        ]
      },
      {
        id: 'chat_boyfriend_end_good',
        text: 'They left. Still here. Still breathing. I love you so much.',
        isPlayer: false,
        isFinal: true
      },
      {
        id: 'chat_boyfriend_end_uncertain',
        text: 'Battery dying. If this is it... you were the best thing in my life.',
        isPlayer: false,
        isFinal: true
      },
      {
        id: 'chat_boyfriend_end_bad',
        text: '[User has gone offline]',
        isPlayer: false,
        isFinal: true
      }
    ]
  },
  bestie: {
    day1: [
      {
        id: 'bestie_1_1',
        triggerTime: 12.0, // 12:00
        text: "omg did you see that cat pic I tagged you in? We need a kitten for the apocalypse lol",
        options: [
          {
            id: 'bestie_1_1_a',
            text: "Haha cute. Needed that distraction",
            anxietyScore: -5,
            nextTrigger: 'bestie_1_2'
          },
          {
            id: 'bestie_1_1_b',
            text: "Focus!! Are you for real? Did you see the hospital news?",
            anxietyScore: 5,
            nextTrigger: 'bestie_1_2'
          }
        ]
      },
      {
        id: 'bestie_1_2',
        text: "My timeline is full of conspiracy trash. \"Microwave your phone\"? People are dumb.",
        options: [
          {
            id: 'bestie_1_2_a',
            text: "It's fake, but people are scared you know.",
            anxietyScore: -5,
            nextTrigger: 'bestie_1_3'
          },
          {
            id: 'bestie_1_2_b',
            text: "I don't know, maybe they're on to something?",
            anxietyScore: 5,
            nextTrigger: 'bestie_1_3'
          }
        ]
      },
      {
        id: 'bestie_1_3',
        text: "Did you see Kyle's post? His roommate is screaming at the wall or smtn?",
        options: [
          {
            id: 'bestie_1_3_a',
            text: "Tell Kyle to get the fuck away from him",
            anxietyScore: 15,
            nextTrigger: 'bestie_1_4'
          },
          {
            id: 'bestie_1_3_b',
            text: "Probably just drunk haha",
            anxietyScore: -15,
            nextTrigger: 'bestie_1_4'
          }
        ]
      },
      {
        id: 'bestie_1_4',
        text: "I'm kinda freaking out being alone here. Should I go to my parents' house?",
        options: [
          {
            id: 'bestie_1_4_a',
            text: "No! Roads are blocked. It's better you stay where you are.",
            anxietyScore: 15,
            nextTrigger: 'bestie_1_5'
          },
          {
            id: 'bestie_1_4_b',
            text: "Yeah, leave the city while you can. Don't stay alone.",
            anxietyScore: 20,
            nextTrigger: 'bestie_1_5'
          }
        ]
      },
      {
        id: 'bestie_1_5',
        text: "I hear someone in the hallway. They are trying doorknobs. I think they're asking for help?",
        options: [
          {
            id: 'bestie_1_5_a',
            text: "Seriously? Make sure your door is deadbolted",
            anxietyScore: 20,
            nextTrigger: 'bestie_1_end_a'
          },
          {
            id: 'bestie_1_5_b',
            text: "Ask who it is?",
            anxietyScore: -20,
            nextTrigger: 'bestie_1_end_b'
          }
        ]
      },
      {
        id: 'bestie_1_end_a',
        text: "Yeah good idea... I hope they're okay though",
        isFinal: true
      },
      {
        id: 'bestie_1_end_b',
        text: "I tried, but no one answered. It's silent now I think? Guess they're gone",
        isFinal: true
      }
    ],
    day2: [
      {
        id: 'chat_bestie_2',
        text: 'internet is getting spotty. my phone keeps losing signal. are u ok??',
        isPlayer: false,
        triggerTime: 11.0, // 11:00 Day 2
        options: [
          {
            id: 'bs_2_a',
            text: 'I\'m fine. Save your battery. Only text if emergency.',
            anxietyScore: -5,
            isLethal: false,
            nextTrigger: 'chat_bestie_2_response_a'
          },
          {
            id: 'bs_2_b',
            text: 'Barely. This is getting worse. Are you with your family?',
            anxietyScore: +10,
            isLethal: false,
            nextTrigger: 'chat_bestie_2_response_b'
          }
        ]
      },
      {
        id: 'chat_bestie_2_response_a',
        text: 'ok. scared but alive. parents are home. stay safe bestie.',
        isPlayer: false,
        options: [
          {
            id: 'bs_2a_a',
            text: 'Good. Keep them close. This will pass.',
            anxietyScore: -10,
            isLethal: false,
            nextTrigger: 'chat_bestie_day2_end_safe'
          },
          {
            id: 'bs_2a_b',
            text: 'Do you have enough supplies?',
            anxietyScore: -5,
            isLethal: false,
            nextTrigger: 'chat_bestie_day2_end_safe'
          }
        ]
      },
      {
        id: 'chat_bestie_2_response_b',
        text: 'yeah everyone is here. we saw smoke from the window. what is happening??',
        isPlayer: false,
        options: [
          {
            id: 'bs_2b_a',
            text: 'Don\'t look outside. Just stay together and stay quiet.',
            anxietyScore: -5,
            isLethal: false,
            nextTrigger: 'chat_bestie_day2_end_safe'
          },
          {
            id: 'bs_2b_b',
            text: 'I don\'t know. No one knows. Just survive.',
            anxietyScore: +15,
            isLethal: false,
            nextTrigger: 'chat_bestie_day2_end_worried'
          }
        ]
      },
      {
        id: 'chat_bestie_day2_end_safe',
        text: 'ok. love u. see u on the other side.',
        isPlayer: false,
        isFinal: true
      },
      {
        id: 'chat_bestie_day2_end_worried',
        text: 'this is nightmare. gonna try to sleep. be safe.',
        isPlayer: false,
        isFinal: true
      }
    ],
    day3: [
      {
        id: 'chat_bestie_3',
        text: 'signal keeps cutting out. just wanted to say ur my best friend. no matter what.',
        isPlayer: false,
        triggerTime: 12.0, // 12:00 Day 3
        options: [
          {
            id: 'bs_3_a',
            text: 'We\'re going to be fine. When this is over, we\'re taking that trip.',
            anxietyScore: -10,
            isLethal: false,
            nextTrigger: 'chat_bestie_3_response_a'
          },
          {
            id: 'bs_3_b',
            text: 'Don\'t talk like that. This isn\'t goodbye.',
            anxietyScore: +5,
            isLethal: false,
            nextTrigger: 'chat_bestie_3_response_b'
          }
        ]
      },
      {
        id: 'chat_bestie_3_response_a',
        text: 'yeah. yeah ur right. parents are sleeping. im keeping watch.',
        isPlayer: false,
        options: [
          {
            id: 'bs_3a_a',
            text: 'Good. Wake them if you hear anything strange.',
            anxietyScore: -5,
            isLethal: false,
            nextTrigger: 'chat_bestie_end_good'
          },
          {
            id: 'bs_3a_b',
            text: 'Try to rest too. You need energy.',
            anxietyScore: 0,
            isLethal: false,
            nextTrigger: 'chat_bestie_end_good'
          }
        ]
      },
      {
        id: 'chat_bestie_3_response_b',
        text: 'ok. ok ur right. were gonna make it. were gonna be ok.',
        isPlayer: false,
        options: [
          {
            id: 'bs_3b_a',
            text: 'Yes we are. I believe that. Love you.',
            anxietyScore: -10,
            isLethal: false,
            nextTrigger: 'chat_bestie_end_good'
          },
          {
            id: 'bs_3b_b',
            text: 'Just hold on. Help is coming.',
            anxietyScore: +5,
            isLethal: false,
            nextTrigger: 'chat_bestie_end_uncertain'
          }
        ]
      },
      {
        id: 'chat_bestie_end_good',
        text: '💜 love u. talk soon.',
        isPlayer: false,
        isFinal: true
      },
      {
        id: 'chat_bestie_end_uncertain',
        text: 'hope so. battery low. going offline. 💜',
        isPlayer: false,
        isFinal: true
      },
      {
        id: 'chat_bestie_end_bad',
        text: '[User is no longer available]',
        isPlayer: false,
        isFinal: true
      }
    ]
  }
};

export const ENDINGS = {
  survived: {
    title: 'SURVIVED',
    description: 'made it through. Location unknown. Status: Alive.'
  },
  uncertain: {
    title: 'STATUS UNKNOWN',
    description: 'last contact was inconclusive. Fate uncertain.'
  },
  deceased: {
    title: 'LOST',
    description: 'did not survive the outbreak.'
  },
  safe: {
    title: 'SAFE',
    description: 'confirmed safe in shelter. Reunification pending.'
  }
};