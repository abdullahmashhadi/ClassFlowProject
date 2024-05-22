export const calculateSubjectAttendancePercentage = (
  presentCount,
  absentCount
) => {
  if (absentCount === 0 && presentCount === 0) {
    return 0;
  }
  const percentage = (presentCount / (presentCount + absentCount)) * 100;
  return percentage.toFixed(2); // Limit to two decimal places
};

export const groupAttendanceBySubject = (subjectAttendance) => {
  const attendanceBySubject = {};

  subjectAttendance.forEach((attendance) => {
    const subName = attendance.subName.subName;
    const sessions = attendance.subName.sessions;
    const subId = attendance.subName._id;

    if (!attendanceBySubject[subName]) {
      attendanceBySubject[subName] = {
        present: 0,
        absent: 0,
        sessions: 0,
        allData: [],
        subId: subId,
      };
    }
    if (attendance.status === "Present") {
      attendanceBySubject[subName].present++;
      attendanceBySubject[subName].sessions++;
    } else if (attendance.status === "Absent") {
      attendanceBySubject[subName].absent++;
      attendanceBySubject[subName].sessions++;
    }
    attendanceBySubject[subName].allData.push({
      date: attendance.date,
      status: attendance.status,
    });
  });
  return attendanceBySubject;
};

export const calculateOverallAttendancePercentage = (subjectAttendance) => {
  let absentCountSum = 0;
  let presentCountSum = 0;

  const uniqueSubIds = [];

  subjectAttendance.forEach((attendance) => {
    const subId = attendance.subName._id;
    if (!uniqueSubIds.includes(subId)) {
      // const sessions = parseInt(attendance.subName.sessions);
      // totalSessionsSum += sessions;
      uniqueSubIds.push(subId);
    }
    presentCountSum += attendance.status === "Present" ? 1 : 0;
    absentCountSum += attendance.status === "Absent" ? 1 : 0;
  });

  if (absentCountSum === 0 && presentCountSum === 0) {
    return 0;
  }

  return (presentCountSum / (presentCountSum + absentCountSum)) * 100;
};
