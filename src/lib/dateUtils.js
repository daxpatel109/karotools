export function formatSafeDate(dateInput) {
  if (!dateInput) return "Updated for FY 2026-27";
  
  const dateObj = new Date(dateInput);
  
  if (Number.isNaN(dateObj.getTime())) {
    return "Updated for FY 2026-27";
  }
  
  try {
    return dateObj.toLocaleDateString('en-IN', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  } catch (e) {
    return "Updated for FY 2026-27";
  }
}

export function formatSafeDateLong(dateInput) {
  if (!dateInput) return "Updated for FY 2026-27";
  
  const dateObj = new Date(dateInput);
  
  if (Number.isNaN(dateObj.getTime())) {
    return "Updated for FY 2026-27";
  }
  
  try {
    return dateObj.toLocaleDateString('en-IN', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  } catch (e) {
    return "Updated for FY 2026-27";
  }
}

export function getSafeISODate(dateInput) {
  if (!dateInput) return undefined;
  
  const dateObj = new Date(dateInput);
  
  if (Number.isNaN(dateObj.getTime())) {
    return undefined;
  }
  
  try {
    return dateObj.toISOString();
  } catch (e) {
    return undefined;
  }
}
