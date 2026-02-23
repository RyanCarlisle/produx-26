// Email validation regex (basic format check)
export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Phone validation regex (10 digits, starts with 6-9)
export const phoneRegex = /^[6-9]\d{9}$/;

// Registration Number format for specific events (2024PGPxxx)
export const pgpRegex = /^2024PGP\d{3}$/;

/**
 * Validates a mobile number.
 * 
 * @param {string} phone - The phone number to check
 * @returns {Object} result - { isValid: boolean, error: string|null }
 */
export const validatePhone = (phone) => {
  if (!phone) {
    return { isValid: false, error: "Mobile number is required." };
  }
  if (!phoneRegex.test(phone)) {
    return { isValid: false, error: "Please enter a valid 10-digit mobile number" };
  }
  return { isValid: true, error: null };
};

// Events that allow external (non-IIM Shillong) registrations
const OPEN_EVENTS = [];

// Domain validation constant
const ALLOWED_DOMAIN = 'iimshillong.ac.in';

/**
 * Validates if an email address is valid and belongs to the allowed domain 
 * (unless the event is in the OPEN_EVENTS list).
 * 
 * @param {string} email - The email to check
 * @param {string} eventType - The type of event
 * @returns {Object} result - { isValid: boolean, error: string|null }
 */
export const validateEmail = (email, eventType) => {
  if (!email) {
    return { isValid: false, error: "Email is required." };
  }

  if (!emailRegex.test(email)) {
    return { isValid: false, error: "Please enter a valid email address." };
  }

  // Domain check for restricted events
  // User requested strict enforcement for all current events
  const isOpenEvent = OPEN_EVENTS.includes(eventType);
  
  // Strict check regardless of environment as per request
  const shouldCheckDomain = !isOpenEvent;

  if (shouldCheckDomain && !email.endsWith(`@${ALLOWED_DOMAIN}`)) {
    return {
      isValid: false,
      error: `Registration restricted to IIM Shillong email addresses (@${ALLOWED_DOMAIN}) for this event.`
    };
  }

  return { isValid: true, error: null };
};

/**
 * Validates team requirements for specific events.
 * 
 * @param {boolean} isBoardroom - Whether the event is "BOARDROOM BATTLEGROUND"
 * @param {Array} teamMembers - Array of active team members (excluding captain)
 * @returns {Object} result - { isValid: boolean, error: string|null }
 */
export const validateTeamRequirements = (isBoardroom, teamMembers) => {
  if (isBoardroom) {
    if (teamMembers.length !== 2) {
      return {
        isValid: false,
        error: "BOARDROOM BATTLEGROUND requires exactly a team of 3 members (You + 2 others). Please add 2 team members."
      };
    }
  }
  return { isValid: true, error: null };
};

/**
 * Validates a registration number.
 * 
 * @param {string} regNumber - The registration number to check
 * @param {string} eventType - The type of event
 * @returns {Object} result - { isValid: boolean, error: string|null }
 */
export const validateRegistrationNumber = (regNumber, eventType) => {
  const strictRegEvents = ["bITeCast", "Product Pioneers"];
  if (strictRegEvents.includes(eventType) && regNumber) {
    if (!pgpRegex.test(regNumber.trim())) {
       return { isValid: false, error: "Registration Number must follow format 2024PGPxxx (e.g. 2024PGP023)" };
    }
  }
  return { isValid: true, error: null };
};

/**
 * Validates a team member object.
 * 
 * @param {Object} member - The team member object {id, name, email}
 * @param {number} index - Index in the array (0-based)
 * @param {string} eventType - The type of event
 * @returns {Object} result - { isValid: boolean, error: string|null }
 */
export const validateTeamMember = (member, index, eventType) => {
  const memberIndex = index + 2; // Captain is 1, first member is 2

  if (!member.name) {
    return { isValid: false, error: `Please enter a name for Member ${memberIndex}.` };
  }

  if (eventType === "TechVentures" || eventType === "bITeWars") {
    if (!member.phone) {
      return { isValid: false, error: `Please enter a phone number for Member ${memberIndex}.` };
    }
    if (!member.regNumber) {
      return { isValid: false, error: `Please enter a registration number for Member ${memberIndex}.` };
    }
    if (eventType === "bITeWars" && !member.email) {
      return { isValid: false, error: `Please enter an email for Member ${memberIndex}.` };
    }
  }

  if (member.email) {
    if (!emailRegex.test(member.email)) {
      return { isValid: false, error: `Please enter a valid email for Member ${memberIndex}.` };
    }

    // Domain check
    const isOpenEvent = OPEN_EVENTS.includes(eventType);
    const shouldCheckDomain = !isOpenEvent;
    
    if (shouldCheckDomain && !member.email.endsWith(`@${ALLOWED_DOMAIN}`)) {
      return { isValid: false, error: `Member ${memberIndex} must have an IIM Shillong email address (@${ALLOWED_DOMAIN}).` };
    }
  }

  if (member.phone) {
    if (!phoneRegex.test(member.phone)) {
      return { isValid: false, error: `Please enter a valid 10-digit mobile number for Member ${memberIndex}.` };
    }
  }

  return { isValid: true, error: null };
};
