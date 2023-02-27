import React, { useEffect, useState } from "react";
import { Panel } from "../../../components/Panel";
import { getProjects } from "../../../util/projectHandler";
import { useHistory } from "react-router-dom";

export const ProjectPanel = ({ token }) => {
  const [projects, setProjects] = useState([]);
  let history = useHistory();

  useEffect(() => {
    const myProjects = getProjects({ token: token });
    myProjects
      .then((value) => {
        if (value.length !== 0) {
          setProjects(value);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleProjectClick = (e) => {
    history.push(`/project/${e.target.id}`);
  };

  return (
    <Panel title="Projects">
      {projects.length !== 0 ? (
        <table className="table table-sm table-hover w-100">
          <tbody>
            {projects.map((project, index) => (
              <tr
                className="row w-100 m-0 mt-2 center"
                role="button"
                key={index}
              >
                <td className="col-6" onClick={handleProjectClick}>
                  <div
                    id={project.id}
                    className="overflow-hidden overflow-ellipsis"
                  >
                    {project.title}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>
          <p>No Project Information Found</p>
        </div>
      )}
    </Panel>
  );
};
