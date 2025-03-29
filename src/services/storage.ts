import { seedWorkflows } from "./data";

export interface Workflow {
  id: string;
  name: string;
  createdAt: number;
  updatedAt: number;
  description?: string;
  lastEditedBy?: string;
  lastEditedOn?: string;
  flowData?: any; // This will store nodes and edges
}

const STORAGE_KEY = "workflows";

export const initializeWorkflows = (): void => {
    const storedData = localStorage.getItem(STORAGE_KEY);
    if (!storedData) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(seedWorkflows));
    }
  };

export const getWorkflows = (): Workflow[] => {
  try {
    const storedData = localStorage.getItem(STORAGE_KEY);
    if (!storedData) return [];

    const parsedData = JSON.parse(storedData) as Workflow[];

    // Ensure all workflows have required properties
    return parsedData.filter((workflow) => workflow.id && workflow.name);
  } catch (error) {
    console.error("Failed to parse workflows:", error);
    return [];
  }
};

export const saveWorkflow = (workflow: Workflow): void => {
  try {
    const workflows = getWorkflows();
    const now = Date.now();

    // If workflow exists, update it
    const existingIndex = workflows.findIndex((w) => w.id === workflow.id);

    if (existingIndex >= 0) {
      workflows[existingIndex] = {
        ...workflow,
        updatedAt: now,
      };
    } else {
      // Otherwise add new workflow
      workflows.push({
        ...workflow,
        createdAt: now,
        updatedAt: now,
      });
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(workflows));

    console.log("workflow", workflow);
  } catch (error) {
    console.error("Failed to save workflow:", error);
    throw new Error("Failed to save workflow");
  }
};

// Delete a workflow from localStorage
export const deleteWorkflow = (id: string): void => {
  try {
    const workflows = getWorkflows();
    const filteredWorkflows = workflows.filter((w) => w.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredWorkflows));
  } catch (error) {
    console.error("Failed to delete workflow:", error);
    throw new Error("Failed to delete workflow");
  }
};

// Generate a unique ID for a new workflow
export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 12);
};
