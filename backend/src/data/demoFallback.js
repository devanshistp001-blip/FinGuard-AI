export function buildDemoAnalysis(inputText = '') {
  const text = (inputText || '').toLowerCase();

  const hasUrgency = /(limited time|limited slots|act now|today only|dont miss out|hurry|before your slot expires|24 hours|immediate)/.test(text);
  const hasGuaranteedReturn = /(guaranteed|fixed return|double your money|return in 30 days|earn .*%|profit in .* days)/.test(text);
  const hasSalesPitch = /(join our exclusive|premium calls|members only|insider stock ideas|special access|private group)/.test(text);
  const hasEducationSignals = /(before making a financial decision|risk tolerance|financial goals|verify information using reliable sources|reliable sources|review relevant information|understand the product|past performance does not guarantee future results|consider their financial goals|check the company|financial statements|official filings)/.test(text);

  if (hasGuaranteedReturn || (hasUrgency && /(invest|return|profit|opportunity)/.test(text))) {
    return {
      claim: 'The content claims a specific financial return or promise that needs independent verification.',
      summary: 'The message uses urgency and a highly specific return claim to attract quick attention.',
      redFlags: [
        {
          title: 'Guaranteed return claim',
          explanation: 'Promises of fixed returns are a potential red flag because financial outcomes are never guaranteed and the claim lacks supporting evidence.',
          severity: 'high',
        },
        {
          title: 'Pressure and urgency',
          explanation: 'The message uses urgency and limited slots language to push quick action without providing context or verification.',
          severity: 'high',
        },
        {
          title: 'Missing evidence',
          explanation: 'There is no source, proof, or clear explanation of how the return is being calculated or supported.',
          severity: 'medium',
        },
      ],
      contentType: 'promotion',
      contentTypeExplanation: 'This appears promotional because it focuses on a short-term return promise and uses urgency to push action.',
      evidenceChecklist: [
        'Identify the original source and whether it is a verified organization or individual.',
        'Check whether the claim provides proper supporting evidence or documentation.',
        'Look for the date, context, and whether the return claim is based on a real track record or official information.',
        'Verify whether the message is using pressure or urgency to prompt quick action.',
      ],
      uncertainty: [
        'The system cannot confirm the actual performance or legitimacy of the claim from this message alone.',
        'The message does not provide enough evidence to verify the promised return.',
      ],
      simpleExplanation: 'This message claims a fixed return and creates urgency. That is a warning sign because financial outcomes are uncertain and the claim needs proof before it can be trusted.',
      hindiExplanation: 'Is message mein fixed return aur urgency ka claim hai. Yeh ek warning sign hai kyunki financial results guaranteed nahi hote aur is claim ke liye proof chahiye.',
      safeNextSteps: [
        'Find the original source of the message.',
        'Check whether the claim has reliable evidence and documentation.',
        'Compare the statement with official and trustworthy information before believing it.',
      ],
    };
  }

  if (hasSalesPitch) {
    return {
      claim: 'Exclusive access to insider stock ideas and premium calls for members only.',
      summary: 'The content tries to create a sense of access and exclusivity around financial information.',
      redFlags: [
        {
          title: 'Exclusive access claim',
          explanation: 'The content claims special access and invites users into a closed group, which may be promotional and requires verification.',
          severity: 'medium',
        },
        {
          title: 'Sales-like language',
          explanation: 'The message is framed like a sales pitch rather than neutral educational information.',
          severity: 'medium',
        },
      ],
      contentType: 'promotion',
      contentTypeExplanation: 'This content appears promotional because it focuses on membership access and special private recommendations rather than neutral educational content.',
      evidenceChecklist: [
        'Check the identity and credibility of the source.',
        'Look for evidence of the methodology being discussed.',
        'Verify whether the group or service provides transparent and verifiable information.',
      ],
      uncertainty: [
        'The message does not explain the basis for the stock ideas or calls.',
        'The true intent and credibility of the source cannot be verified from this content alone.',
      ],
      simpleExplanation: 'This message sounds like a sales pitch for a private group or premium service. It is not enough to trust the claims without checking who is behind it and what proof they provide.',
      hindiExplanation: 'Yeh message ek private group ya premium service ke liye sales pitch jaisa lag raha hai. Iske claims ko trust karne se pehle source aur proof check karna chahiye.',
      safeNextSteps: [
        'Review the source and the exact offer being made.',
        'Look for a transparent explanation of the strategy or evidence behind the claims.',
        'Check whether the message is being used to pressure users into joining or paying.',
      ],
    };
  }

  if (hasEducationSignals) {
    return {
      claim: 'The content is encouraging careful review, context, and independent verification before acting on a financial claim.',
      summary: 'This content is educational and focused on verification before making any conclusion.',
      redFlags: [],
      contentType: 'education',
      contentTypeExplanation: 'This appears educational because it encourages independent review, source checking, and careful analysis rather than pushing a quick action.',
      evidenceChecklist: [
        'Check whether the message is aligned with reliable financial literacy guidance.',
        'Review the claims against official filings and trusted sources.',
        'Look for context on how the advice is meant to be used.',
      ],
      uncertainty: [
        'The message does not provide a specific company or investment case to evaluate in depth.',
      ],
      simpleExplanation: 'This message is educational and encourages a careful review of company information and official records. That is a safer and more responsible approach.',
      hindiExplanation: 'Yeh message educational hai aur company information aur official records ko check karne ke liye bol raha hai. Ye safer aur responsible approach hai.',
      safeNextSteps: [
        'Verify the advice against reliable information.',
        'Look for official filings or company statements when evaluating the claim.',
        'Use the message as a reminder to research carefully rather than act on urgency.',
      ],
    };
  }

  return {
    claim: 'The content is making a general financial claim or opinion that needs context and evidence.',
    summary: 'The message may be promotional, uncertain, or partly educational, and it needs independent verification.',
    redFlags: [
      {
        title: 'Limited context',
        explanation: 'The message provides too little detail to assess the basis of the claim clearly.',
        severity: 'medium',
      },
      {
        title: 'No clear supporting evidence',
        explanation: 'The content does not explain where the claim is coming from or what evidence supports it.',
        severity: 'medium',
      },
    ],
    contentType: 'mixed',
    contentTypeExplanation: 'This content appears mixed because it contains some indicators of interest or confidence, but without enough context or evidence to make a reliable conclusion.',
    evidenceChecklist: [
      'Find the original source of the claim.',
      'Check whether the claim includes any supporting documentation or context.',
      'Look for the timeline and the basis behind the statement.',
    ],
    uncertainty: [
      'The actual intent and evidence behind the claim cannot be verified from the provided content alone.',
      'The system cannot determine whether the message is a neutral explanation or a marketing push.',
    ],
    simpleExplanation: 'This content contains a financial suggestion or claim, but it does not give enough evidence to judge it properly. The message needs more context and independent checking before it can be trusted.',
    hindiExplanation: 'Is content mein ek financial suggestion ya claim hai, lekin proof aur context bahut kam hai. Isliye isko trust karne se pehle aur details check karna chahiye.',
    safeNextSteps: [
      'Identify the original source of the post or message.',
      'Look for supporting evidence, sources, and dates.',
      'Compare the statement with official information and independent reporting before acting.',
    ],
  };
}
