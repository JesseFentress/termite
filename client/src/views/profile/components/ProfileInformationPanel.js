export const ProfileInformationPanel = ({ labelText, text, isPassword, isRole }) => {

    const handleEditButtonClick = () => {
        if (isPassword) {
            
        }
    }

    return (
        <div className="info d-flex justify-content-between align-items-center mt-4 shadow-lg border">
            <div className="d-flex w-50">
                <label className="infoLabel text-muted">
                    {labelText}
                </label>
                <input 
                    className="profileInfoText px-4" 
                    type={isPassword ? "password" : text} 
                    value={text} 
                    readOnly 
                    style={{textTransform: isRole ? "capitalize" : "none"}}
                    >
                </input>
            </div>
            {
                !isRole ?
                    <div className="d-flex h-100 align-items-center" onClick={handleEditButtonClick}>
                        <img className="hover-icon h-50" src={"/edit-icon.png"}/>
                    </div>
                    :
                    null
            }
        </div>
    );
}