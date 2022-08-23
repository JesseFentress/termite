import { Panel } from "../../../components/Panel";

export const TeamTable  = ({
    team
}) => {
    return (       
        <div className="h-200 overflow-auto mx-2">
            <table className="table table-bordered table-sm table-hover">    
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                </tr>
            </thead>
                <tbody>
                { team ? team.map((member, index) => (
                    <tr className="w-100 mt-2" role="button" key={index}>
                            <td className="col-6"><div className="overflow-hidden overflow-ellipsis">{member.first_name + " " + member.last_name}</div></td>
                            <td className="col-6"><div className="overflow-hidden overflow-ellipsis">{member.email}</div></td>
                    </tr>
                )) : null}
                </tbody>
            </table>
        </div>
    );
};