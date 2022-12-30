

type Props = {
    mainTitile: string;
    salary: string;
    description: string;
    city: string;
    workExpirience: string;
    workFormat: string;
    requirement?: string;
    responsibilities?: string;
}

export const workToPdfString = (data: Props) => {
  return `
        <div>
            <div>
            ${data.mainTitile}
            <div/>
            <div>
                ${data.salary}
            <div/>
            <div>
            ${data.description}
            <div/>
        <div/>
    `;
};
