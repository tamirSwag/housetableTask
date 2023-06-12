export function extrectFormDataAsJson(form) {
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    return formJson;
}
