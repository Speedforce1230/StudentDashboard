export type user = {
    id: string;
    username: string;
    password: string;
    role: "student" | "admin";
};
export type assignment = {
    id: string;
    title: string;
    link: string;
    description: string;
};
export type submission = {
    assignmentId: string;
    student: string;
    submitted: boolean;
};
const users: user[] = [
    {
        username: "student1",
        password: "student1",
        id: "student1",
        role: "student",
    },
    {
        username: "student2",
        password: "student2",
        id: "student2",
        role: "student",
    },
    {
        username: "prof1",
        password: "prof1",
        id: "prof1",
        role: "admin",
    },
];
export function createLocalStorage() {
    if (!window.localStorage.getItem("allowedUsers")) {
        localStorage.setItem("allowedUsers", JSON.stringify(users));
    }
    if (!window.localStorage.getItem("assignments")) {
        localStorage.setItem("assignments", JSON.stringify([]));
    }
    if (!window.localStorage.getItem("submissions")) {
        localStorage.setItem("submissions", JSON.stringify([]));
    }
}
export function getAllowedUsers(): user[] {
    const users = window.localStorage.getItem("allowedUsers");
    if (!users) return [];
    return JSON.parse(users);
}
export function getAssignments(): assignment[] {
    const assignments = window.localStorage.getItem("assignments");
    if (!assignments) return [];
    return JSON.parse(assignments);
}
export function getSubmissions(): submission[] {
    const submissions = window.localStorage.getItem("submissions");
    if (!submissions) return [];
    return JSON.parse(submissions);
}
export function getSubmissionFromAssignment(id: string): submission[] {
    const submissions = getSubmissions();
    const submittedBy = submissions.filter(
        (submission) => submission.assignmentId === id
    );
    return submittedBy;
}
export function addAssignment(newAssignment: assignment) {
    const assignments = getAssignments();
    const students = getAllowedUsers().filter(
        (student) => student.role === "student"
    );
    assignments.unshift(newAssignment);
    window.localStorage.setItem("assignments", JSON.stringify(assignments));
    students.map((student) => {
        const newSubmission: submission = {
            assignmentId: newAssignment.id,
            student: student.username,
            submitted: false,
        };
        addSubmission(newSubmission);
    });
    return getAssignments();
}
export function addSubmission(newSubmission: submission) {
    const submissions = getSubmissions();
    // Prevents re-submissions from same student.
    const submitted = submissions.find(
        (sub) =>
            sub.assignmentId === newSubmission.assignmentId &&
            sub.student === newSubmission.student
    );
    if (!submitted) {
        submissions.push(newSubmission);
        window.localStorage.setItem("submissions", JSON.stringify(submissions));
        return getSubmissions();
    }
    return getSubmissions();
}
export function markSubmission(
    assignmentId: string,
    student: string
): submission[] {
    const submissions = getSubmissions();
    const newSubmissions = submissions.map((submission) => {
        if (
            student === submission.student &&
            assignmentId === submission.assignmentId
        ) {
            return { ...submission, submitted: true };
        }
        return submission;
    });
    window.localStorage.setItem("submissions", JSON.stringify(newSubmissions));
    return newSubmissions;
}
export function updateAssignment(id: string, updateAssignment: assignment) {
    const assignments = getAssignments().map((value) =>
        value.id === id ? updateAssignment : value
    );
    window.localStorage.setItem("assignments", JSON.stringify(assignments));
    return getAssignments();
}
export function deleteAssignment(id: string) {
    const assignments = getAssignments();
    const removed = assignments.filter((value) => value.id !== id);
    window.localStorage.setItem("assignments", JSON.stringify(removed));
    return getAssignments();
}
