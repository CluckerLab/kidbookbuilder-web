/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
export default function MyForm(props) {
    const { onSubmit, onValidate, onChange, overrides, ...rest } = props;
    const initialValues = {
        parentName: "",
        parentEmail: "",
        childName: "",
        childAge: ""
    };
    const [parentName, setParentName] = React.useState(initialValues.parentName);
    const [parentEmail, setParentEmail] = React.useState(initialValues.parentEmail);
    const [childName, setChildName] = React.useState(initialValues.childName);
    const [childAge, setChildAge] = React.useState(initialValues.childAge);
    const [errors, setErrors] = React.useState({});
    const resetStateValues = () => {
        setParentName(initialValues.parentName);
        setParentEmail(initialValues.parentEmail);
        setChildName(initialValues.childName);
        setChildAge(initialValues.childAge);
        setErrors({});
    };
    const validations = {
        parentName: [],
        parentEmail: [],
        childName: [],
        childAge: []
    };
    const runValidationTasks = async (fieldName, currentValue, getDisplayValue) => {
        const value = currentValue && getDisplayValue ? getDisplayValue(currentValue) : currentValue;
        let validationResponse = validateField(value, validations[fieldName]);
        const customValidator = fetchByPath(onValidate, fieldName);
        if (customValidator) {
            validationResponse = await customValidator(value, validationResponse);
        }
        setErrors(errors => ({ ...errors, [fieldName]: validationResponse }));
        return validationResponse;
    };
    return (<Grid as="form" rowGap="15px" columnGap="15px" padding="20px" onSubmit={async (event) => {
            event.preventDefault();
            const modelFields = {
                parentName,
                parentEmail,
                childName,
                childAge
            };
            const validationResponses = await Promise.all(Object.keys(validations).reduce((promises, fieldName) => {
                if (Array.isArray(modelFields[fieldName])) {
                    promises.push(...modelFields[fieldName].map(item => runValidationTasks(fieldName, item)));
                    return promises;
                }
                promises.push(runValidationTasks(fieldName, modelFields[fieldName]));
                return promises;
            }, []));
            if (validationResponses.some(r => r.hasError)) {
                return;
            }
            await onSubmit(modelFields);
        }} {...getOverrideProps(overrides, "MyForm")} {...rest}><TextField label="Parent name" value={parentName} onChange={e => {
            let { value } = e.target;
            if (onChange) {
                const modelFields = {
                    parentName: value,
                    parentEmail,
                    childName,
                    childAge
                };
                const result = onChange(modelFields);
                value = result?.parentName ?? value;
            }
            if (errors.parentName?.hasError) {
                runValidationTasks("parentName", value);
            }
            setParentName(value);
        }} onBlur={() => runValidationTasks("parentName", parentName)} errorMessage={errors.parentName?.errorMessage} hasError={errors.parentName?.hasError} {...getOverrideProps(overrides, "parentName")}></TextField><TextField label="Parent email" value={parentEmail} onChange={e => {
            let { value } = e.target;
            if (onChange) {
                const modelFields = {
                    parentName,
                    parentEmail: value,
                    childName,
                    childAge
                };
                const result = onChange(modelFields);
                value = result?.parentEmail ?? value;
            }
            if (errors.parentEmail?.hasError) {
                runValidationTasks("parentEmail", value);
            }
            setParentEmail(value);
        }} onBlur={() => runValidationTasks("parentEmail", parentEmail)} errorMessage={errors.parentEmail?.errorMessage} hasError={errors.parentEmail?.hasError} {...getOverrideProps(overrides, "parentEmail")}></TextField><TextField label="Child name" value={childName} onChange={e => {
            let { value } = e.target;
            if (onChange) {
                const modelFields = {
                    parentName,
                    parentEmail,
                    childName: value,
                    childAge
                };
                const result = onChange(modelFields);
                value = result?.childName ?? value;
            }
            if (errors.childName?.hasError) {
                runValidationTasks("childName", value);
            }
            setChildName(value);
        }} onBlur={() => runValidationTasks("childName", childName)} errorMessage={errors.childName?.errorMessage} hasError={errors.childName?.hasError} {...getOverrideProps(overrides, "childName")}></TextField><TextField label="Child age" value={childAge} onChange={e => {
            let { value } = e.target;
            if (onChange) {
                const modelFields = {
                    parentName,
                    parentEmail,
                    childName,
                    childAge: value
                };
                const result = onChange(modelFields);
                value = result?.childAge ?? value;
            }
            if (errors.childAge?.hasError) {
                runValidationTasks("childAge", value);
            }
            setChildAge(value);
        }} onBlur={() => runValidationTasks("childAge", childAge)} errorMessage={errors.childAge?.errorMessage} hasError={errors.childAge?.hasError} {...getOverrideProps(overrides, "childAge")}></TextField><Flex justifyContent="space-between" {...getOverrideProps(overrides, "CTAFlex")}><Button children="Clear" type="reset" onClick={(event) => {
            event.preventDefault();
            resetStateValues();
        }} {...getOverrideProps(overrides, "ClearButton")}></Button><Flex gap="15px" {...getOverrideProps(overrides, "RightAlignCTASubFlex")}><Button children="Submit" type="submit" variation="primary" isDisabled={Object.values(errors).some(e => e?.hasError)} {...getOverrideProps(overrides, "SubmitButton")}></Button></Flex></Flex></Grid>);
}
