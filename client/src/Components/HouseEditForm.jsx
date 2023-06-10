function HouseEditForm({handleSubmit, submitBtnText, initialHouse = {}}) {
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label className="form-label">House full address:
                    <input type="text" name="address" defaultValue={initialHouse.address} className="form-control" />
                </label>
            </div>
            <div>
                <label className="form-label">House current value:
                    <input type="number" name="currentValue" defaultValue={initialHouse.currentValue} className="form-control" />
                </label>
            </div>
            <div>
                <label className="form-label">House loan amount:
                    <input type="number" name="loanAmount" defaultValue={initialHouse.loanAmount} className="form-control" />
                </label>
            </div>
            <button type='submit' className="btn btn-primary">{submitBtnText}</button>
        </form>
    );

}

export default HouseEditForm;
