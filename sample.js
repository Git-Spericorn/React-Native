// export multiple functions
export default function createMixpanel(store) {
  const mixpanel = Object.create(Mixpanel);

  mixpanel.store = store;
  mixpanel.people = {
    set: People.set.bind(mixpanel)
  };

  mixpanel.\_distinct_id = null;
  mixpanel.\_superProperties = {};
  mixpanel.\_profileSetQueue = [];
  mixpanel.\_eventQueue = [];

  return mixpanel;
}

// google analytics handlers

export const ROUTE_MAP = {};
ROUTE_MAP["EditEventModal"] = route => {
  if (Object.keys(route.params || {}).length === 0)
    return { eventName: "Create Event Tapped" };
};
ROUTE_MAP["DatingHome"] = route => ({ eventName: "Dating Tab Visited" });
ROUTE_MAP["RecoveryHome"] = route => ({ eventName: "Recovery Tab Visited" });

ROUTE_MAP["INBOX_HOME"] = route => {
  return { eventName: "Inbox View" };
};

OPERATION_MAP["CreateEvent"] = (operation, result) => {
  const event = result.data.createEvent;
  return {
    eventName: "Event Created",
    eventData: {
      eventName: event.title,
      venue: event.venue,
      organizer: event.organizer,
      startsAt: event.startsAt,
      eventCategory: event.category,
      /** @todo This information is not currently tracked */
      eventsCreated: null
    }
  };
};

export const OPERATION_MAP = {};
OPERATION_MAP["AttendEvent"] = (operation, result) => {
  return { eventName: "event joined" };
};
OPERATION_MAP["LoginOrRegisterWithPhoneAndCode"] = (operation, result) => {
  const { firstRegistration } = result.data.loginOrRegisterWithPhoneAndCode;
  return firstRegistration
    ? { eventName: "Register" }
    : { eventName: "Sign In" };
};
OPERATION_MAP["LoginOrRegisterWithFacebook"] = (operation, result) => {
  const { firstRegistration } = result.data.loginOrRegisterWithFacebook;
  return firstRegistration
    ? { eventName: "Register" }
    : { eventName: "Sign In" };
};
OPERATION_MAP["JoinGroup"] = (operation, result) => {
  return { eventName: "Group Joined" };
};
