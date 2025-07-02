import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import projectData from "./projects.json";
import { ProjectCardProps } from "~/types";

const ProjectDetailsPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const [project, setProject] = useState<ProjectCardProps | null>(null);

  useEffect(() => {
    if (!id) return;

    for (const year in projectData) {
      for (const team in (projectData as Record<string, any>)[year]) {
        const item = (projectData as Record<string, any>)[year][team];
        if (item.projectId === id) {
          setProject(item);
          return;
        }
      }
    }
  }, [id]);

  if (!project) return <p>Loading project...</p>;

  return (
    <div className="project-detail-page">
      <h1>{project.title}</h1>
      <p>{project.description}</p>
      <p><strong>Team:</strong> {project.team}</p>
      <p><strong>GitHub:</strong> <a href={project.repoUrl} target="_blank" rel="noreferrer">{project.repoUrl}</a></p>
      <p><strong>Members:</strong> {project.members?.join(", ")}</p>
    </div>
  );
};

export default ProjectDetailsPage;
