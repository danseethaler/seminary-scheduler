export default (assignments, participants) => {
  // Split the participants into equal sections
  // based on the number of assignments
  const chunkSize = Math.floor(participants.length / assignments.length);

  let callCount = -1;

  return () => {
    // Each time the callback is invoked increment
    // the callCount to offset the assignment
    callCount++;
    return assignments.map((assignment, index) => {
      let position = chunkSize * index + callCount;
      position = position % participants.length;

      return {
        assignment,
        assignee: participants[position],
      };
    });
  };
};
