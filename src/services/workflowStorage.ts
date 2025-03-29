import { generateId, getWorkflows, saveWorkflow, Workflow } from "./storage";
import { SerializableEdge, SerializableNode } from "@/types";

export interface WorkflowData {
  nodes: SerializableNode[];
  edges: SerializableEdge[];
}

export const saveWorkflowData = (
  name: string,
  workflowDescription: string,
  flowData: WorkflowData,
  workflowId?: string
): string => {
  const existingWorkflows = getWorkflows();
  const now = Date.now();

  // Check if the workflow exists
  const existingWorkflow = existingWorkflows.find((w) => w.id === workflowId);

  // Create or update the workflow
  const workflow: Workflow = existingWorkflow
    ? {
        ...existingWorkflow,
        name: name || existingWorkflow.name,
        description: workflowDescription || existingWorkflow.description,
        updatedAt: now,
        flowData: flowData,
      }
    : {
        id: workflowId || generateId(),
        name: name || "Untitled Workflow",
        description: workflowDescription,
        createdAt: now,
        updatedAt: now,
        flowData: flowData,
      };

  //   Save to storage
  saveWorkflow(workflow);

  //   console.log("created workflow", workflow);

  return workflow.id;
};

export const loadWorkflowData = (workflowId: string): WorkflowData | null => {
  const workflows = getWorkflows();
  const workflow = workflows.find((w) => w.id === workflowId);

  if (workflow && workflow.flowData) {
    return workflow.flowData as WorkflowData;
  }

  return null;
};
