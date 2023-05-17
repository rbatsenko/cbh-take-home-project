# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

> **Note:** I would be really curious to ask our clients (Facilities) the question about what exact business problem they're trying to solve here, because maybe it can be solved better without additional custom ids. But for now let's assume that this is a requirement we need to implement.


Let's define requirements and architecture for this feature.
1. We need to have a table with the `agent_id`, `facility_id` and `facility_agent_id` for each record. This table will be called `facilities_agents` and will have the following columns:
    - `id` - the id of the record (`PRIMARY KEY`)
    - `agent_id` - the id of the agent in the agents table (part of `UNIQUE INDEX`)
    - `facility_id` - the id of the facility in the facilities table (part of `UNIQUE INDEX`)
    - `facility_agent_id` - the custom id of the agent for the facility
This solution will allow us to separate information which is related to connection between `facility` and `agent` from the `shifts` table.
2. Now we can update the `getShiftsByFacility` function to return the `facility_agent_id` together with `agent_id` for each agent.
3. We need to update the `generateReport` function to use the `facility_agent_id` instead of `agent_id` when generating the report.

Here is a diagram in Excalidraw I came up with to better visualize the solution: [Solution diagram](https://excalidraw.com/#json=1D9g_INUrf17mcQGF8uHK,OsWJTvnHExEUdlxcrSdyxQ) - You can also find the file in the root folder of this repo (`ticket_breakdown_diagram.excalidraw`)

> **Note:** I would also communicate with the client on potential `facility_agent_id` format, as we need to have a validation for it, so we can leverage some auto-generate functionality (button) or allow to pass it, but validate on both FE and BE. Thinking about this makes me once again wonder about the exact business problem we're trying to solve here :)

### Tickets

1. Ticket: create new table called `facilities_agents`
    - Acceptance criteria:
        - `facilities_agents` table is created
        - `facilities_agents` table has the following columns:
            - `id` - the id of the record (`PRIMARY KEY`)
            - `agent_id` - the id of the agent in the agents table
            - `facility_id` - the id of the facility in the facilities table
            - `facility_agent_id` - the custom id of the agent for the facility
        - table has `UNIQUE INDEX` on `agent_id` and `facility_id` columns
        - Further requirements on table columns...
    - Time/effort estimate: 1 hour
    - Implementation details:
        - create migration for `facilities_agents` table
        - run migration

2. Ticket: update `getShiftsByFacility` function
    - Acceptance criteria:
        - `getShiftsByFacility` function returns `facility_agent_id` together with `agent_id` for each agent
    - Time/effort estimate: 3 hours
    - Implementation details:
        - we need to update query to also get `facility_agent_id` for each agent (join on `facilities_agents` table)
        - update `getShiftsByFacility` function to return `facility_agent_id` together with `agent_id` for each agent
        - (depending on optimalization needs, we can cache getting data from this table because `facility_agent_id` will probably be assigned/changed very rarely)
        - update tests for `getShiftsByFacility` function

3. Ticket: update `generateReport` function
    - Acceptance criteria:
        - `generateReport` function uses `facility_agent_id` instead of `agent_id` when generating the report
    - Time/effort estimate: 2 hours
    - Implementation details:
        - update `generateReport` function to use `facility_agent_id` instead of `agent_id` when generating the report
        - update tests for `generateReport` function

4. Ticket: add functionality for Facilities to provide custom ids for Agents (this is more of an epic than a ticket)
    - Acceptance criteria:
        - Facilities can provide custom ids for Agents
        - Facilities can update custom ids for Agents
        - (Now if we have those custom ids it probably means Facilities would want to use them in the views as well, so we need to communicate and ask everything about it, define requirements, tickets)
    - Time/effort estimate: ? (this requires further discussion and estimations, more tickets for BE and FE)
    - Implementation details:
        - add functionality for Facilities to provide custom ids for Agents
        - add functionality for Facilities to update custom ids for Agents
        - Potentially:
            - add functionality for Facilities to see custom ids for Agents
            - add functionality for Facilities to see custom ids for Agents in the Shifts table
        - add tests for all the above functionalities

5. Ticket: [to discuss] - add custom ids for Agents they already worked with
    - Acceptance criteria:
        - Facilities can provide custom ids for existing Agents
        - Facilities can update custom ids for existing Agents
    - Time/effort estimate: ? (this also requires further discussion and estimations, more tickets for BE and FE - eg. how do we handle bulk updates, etc.)
    - Implementation details:
        - depending on discussed requirements (discuss with the team, product, client)


> Again - there is still a lot of questions to be answered, but I think this is a good start. I would also discuss this with the team and the client to make sure we're on the same page and we're solving the right problem.

> **Note:** communication is everything - great products solve user needs, not some imaginary problems we think they have =)
