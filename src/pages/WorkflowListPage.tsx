import ProcessItem from "@/components/ProcessItem";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { formatTimestampToDate } from "@/lib/dateFormat";
import { deleteWorkflow, getWorkflows, Workflow } from "@/services/storage";
import { ArrowDown, MoreVertical, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const WorkflowListPage = () => {
  const navigate = useNavigate();
  const [executeModal, setExecuteModal] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const [deleteModal, setDeleteModal] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const [showProcess, setShowProcess] = useState<string | null>(null);

  const [workflows, setWorkflows] = useState<Workflow[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchWorkflows();
  }, []);

  const fetchWorkflows = () => {
    setIsLoading(true);
    // Artificial delay for loading effect
    setTimeout(() => {
      const data = getWorkflows();
      setWorkflows(data);
      setIsLoading(false);
    }, 300);
  };

  const handleCreateWorkflow = () => {
    navigate("/editor");
  };

  const toggleProcess = (workflowId: string) => {
    setShowProcess((prev) => (prev === workflowId ? null : workflowId));
  };

  const handleWorkflowDelete = (id: string) => {
    deleteWorkflow(id);
    setDeleteModal(null);
    fetchWorkflows();
  };

  // Filter workflows based on search term
  const filteredWorkflows = workflows.filter((workflow) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      workflow.name.toLowerCase().includes(searchLower) ||
      workflow.id.toLowerCase().includes(searchLower) ||
      (workflow.description &&
        workflow.description.toLowerCase().includes(searchLower))
    );
  });

  return (
    <div className="min-h-screen w-full bg-[#FDFBF6] p-6">
      <div className="flex gap-6 relative">
        <div>
          <img
            src="/menu.png"
            alt="hamburger menu icon"
            height={40}
            width={40}
            className="cursor-pointer"
          />
        </div>
        <div className="flex-1 space-y-8">
          <h1 className="text-[#221F20] leading-[40px] font-semibold text-2xl">
            Workflow Builder
          </h1>
          <div className="flex items-center justify-between">
            <div className="bg-white border border-[#E0E0E0] rounded-sm flex justify-between items-center px-3 h-8 min-w-[320px] max-w-[320px]">
              <Input
                placeholder="Search By Workflow Name/ID"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="p-0 bg-transparent border-none placeholder:text-[#BDBDBD] text-xs shadow-none ring-0 h-8 focus-visible:shadow-none focus-visible:ring-0"
              />
              <img src="/search.png" alt="search icon" width={14} height={14} />
            </div>
            <Button onClick={handleCreateWorkflow} className="cursor-pointer">
              + Create New Process
            </Button>
          </div>
          <div className="mt-6">
            <div className="bg-white p-6">
              {isLoading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="loading-indicator" />
                </div>
              ) : filteredWorkflows.length === 0 ? (
                <div className="text-center py-12">
                  <h3 className="text-xl font-semibold mb-2">
                    No workflows found
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    <p className="text-muted-foreground mb-6">
                      {searchTerm
                        ? "Try adjusting your search term"
                        : "Create your first workflow to get started"}
                    </p>
                  </p>
                </div>
              ) : (
                <div>
                  <div className="border-b border-[#F68B21]">
                    <div className="flex justify-between items-center px-3 py-2">
                      <div className="w-[170px] text-black text-sm font-medium">
                        Workflow Name
                      </div>
                      <div className="w-[150px] text-black text-sm font-medium">
                        ID
                      </div>
                      <div className="w-[150px] text-black text-sm font-medium">
                        Last Edited On
                      </div>
                      <div className="flex-1 text-black text-sm font-medium">
                        Description
                      </div>
                      <div className="w-[50px]"></div>
                      <div className="w-[100px]"></div>
                      <div className="w-[100px]"></div>
                      <div className="w-[50px]"></div>
                      <div className="w-[50px]"></div>
                    </div>
                  </div>
                  {filteredWorkflows.map((workflow) => (
                    <div
                      className="border-b border-[#F8F2E7] last:border-0"
                      key={workflow.id}
                    >
                      <div className="flex justify-between items-center px-3 py-4">
                        <div className="w-[170px] font-medium text-sm text-[#4F4F4F]">
                          {workflow.name}
                        </div>
                        <div className="w-[150px] text-sm text-[#4F4F4F]">
                          {workflow.id}
                        </div>
                        <div className="w-[150px] text-xs text-[#4F4F4F]">
                          {formatTimestampToDate(workflow.updatedAt)}
                        </div>
                        <div className="flex-1 text-xs text-[#4F4F4F]">
                          {workflow.description}
                        </div>
                        <div className="w-[50px] flex items-center">
                          <button className="cursor-pointer">
                            <img
                              src="/pin.png"
                              alt="colored pin"
                              width={14}
                              height={16}
                            />
                          </button>
                        </div>
                        <div className="w-[100px]">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              setExecuteModal({
                                id: workflow.id,
                                name: workflow.name,
                              })
                            }
                            className="text-[#221F20] cursor-pointer font-medium text-sm py-2 px-3 rounded-md"
                          >
                            Execute
                          </Button>
                        </div>
                        <div className="w-[100px]">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => navigate(`/editor/${workflow.id}`)}
                            className="text-[#221F20] cursor-pointer font-medium text-sm py-2 px-3 rounded-md"
                          >
                            Edit
                          </Button>
                        </div>
                        <div className="w-[50px] flex items-center">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                className="cursor-pointer text-black h-8 w-8 p-0"
                              >
                                <span className="sr-only">Open menu</span>
                                <MoreVertical size={24} />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                              align="end"
                              className="min-w-[70px]"
                            >
                              <DropdownMenuItem
                                className="text-[#EE3425] text-sm font-normal underline"
                                onClick={() =>
                                  setDeleteModal({
                                    id: workflow.id,
                                    name: workflow.name,
                                  })
                                }
                              >
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                        <div className="w-[50px] flex items-center">
                          <button
                            className={`text-black cursor-pointer transition-transform duration-400 ${
                              showProcess === workflow.id ? "rotate-180" : ""
                            }`}
                            onClick={() => toggleProcess(workflow.id)}
                          >
                            <ArrowDown size={24} />
                          </button>
                        </div>
                      </div>
                      <div
                        className={`bg-[#FFFAF2] overflow-y-auto transition-all duration-400 ${
                          showProcess === workflow.id ? "h-38" : "h-0"
                        }`}
                      >
                        <div className="py-5 space-y-9">
                          <ProcessItem
                            text="28/05 - 20:13 IST"
                            status="Passed"
                          />
                          <ProcessItem
                            text="28/05 - 20:13 IST"
                            status="Failed"
                          />
                          <ProcessItem
                            text="28/05 - 20:13 IST"
                            status="Failed"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {executeModal && (
        <div className="absolute left-0 top-0 h-full w-full bg-black/30">
          <div className="flex justify-center h-full w-full items-center">
            <div className="bg-white rounded-lg w-full max-w-[596px]">
              <div className="px-4 pt-4">
                <div className="flex justify-end py-2">
                  <button
                    className="text-black"
                    onClick={() => setExecuteModal(null)}
                  >
                    <X size={18} />
                  </button>
                </div>
                <div className="pt-6 pb-12 space-y-1.5 text-center">
                  <h3 className="text-[#333333] text-sm font-semibold">
                    Are you sure you want to execute the '{executeModal.name}'?
                  </h3>
                  <p className="text-[#EE3425] text-xs font-medium">
                    You cannot Undo this step
                  </p>
                </div>
              </div>
              <div className="p-4 flex justify-end items-center gap-4 dialog-shadow">
                <Button
                  variant="outline"
                  size="sm"
                  className="text-[#4F4F4F] font-medium text-sm py-1.5 px-3 rounded-sm border-[#E0E0E0]"
                >
                  Yes
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-[#4F4F4F] font-medium text-sm py-1.5 px-3 rounded-sm border-[#E0E0E0]"
                  onClick={() => setExecuteModal(null)}
                >
                  No
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
      {deleteModal && (
        <div className="absolute left-0 top-0 h-full w-full bg-black/30">
          <div className="flex justify-center h-full w-full items-center">
            <div className="bg-white rounded-lg w-full max-w-[596px]">
              <div className="px-4 pt-4">
                <div className="flex justify-end py-2">
                  <button
                    className="text-black"
                    onClick={() => setDeleteModal(null)}
                  >
                    <X size={18} />
                  </button>
                </div>
                <div className="pt-6 pb-12 space-y-1.5 text-center">
                  <h3 className="text-[#333333] text-sm font-semibold">
                    "Are you sure you want to Delete '{deleteModal.name}'?
                  </h3>
                  <p className="text-[#EE3425] text-xs font-medium">
                    You cannot Undo this step
                  </p>
                </div>
              </div>
              <div className="p-4 flex justify-end items-center gap-4 dialog-shadow">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleWorkflowDelete(deleteModal.id)}
                  className="text-[#4F4F4F] font-medium text-sm py-1.5 px-3 rounded-sm border-[#E0E0E0]"
                >
                  Yes
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-[#4F4F4F] font-medium text-sm py-1.5 px-3 rounded-sm border-[#E0E0E0]"
                  onClick={() => setDeleteModal(null)}
                >
                  No
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkflowListPage;
