export type user = {
    id: string;
    username: string;
    password: string;
    role: "student" | "admin";
};
export type assignment = {
    title: string;
    description: string;
};
export type submission = {
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
export function addAssignment(newAssignment: assignment) {
    const assignments = getAssignments();
    assignments.push(newAssignment);
    window.localStorage.setItem("assignments", JSON.stringify(assignments));
    return getAssignments();
}
export function addSubmission(newSubmission: submission) {
    const submissions = getSubmissions();
    submissions.push(newSubmission);
    window.localStorage.setItem("submissions", JSON.stringify(submissions));
    return getSubmissions();
}
